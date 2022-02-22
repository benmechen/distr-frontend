import { authExchange } from "@urql/exchange-auth"
import { BehaviorSubject } from "rxjs"
import {
    cacheExchange,
    Client,
    createClient,
    dedupExchange,
    errorExchange,
    fetchExchange,
    makeOperation
} from "urql"
import {
    RefreshDocument,
    RefreshMutation,
    RefreshMutationVariables
} from "../generated/graphql"

interface IError {
    message: string
    code: string
}

export enum AuthState {
    LOADING,
    AUTHENTICATED,
    UNAUTHENTICATED
}

export class ClientService {
    private client: Client

    public state = new BehaviorSubject<AuthState>(AuthState.LOADING)

    constructor(url: string) {
        this.client = createClient({
            url,
            exchanges: [
                dedupExchange,
                cacheExchange,
                errorExchange({
                    onError({ graphQLErrors }) {
                        if (graphQLErrors) {
                            graphQLErrors.map((_error) => {
                                const error: IError = {
                                    message:
                                        _error.extensions?.message ??
                                        _error.message ??
                                        "An error occurred",
                                    code: _error.extensions?.code ?? "UNKNOWN"
                                }
                                console.error(error)
                                // if (error.code !== 'UNAUTHENTICATED') TODO: Add toast or notification of error message
                                return error
                            })
                        }
                    }
                }),
                authExchange({
                    getAuth: async ({ authState, mutate }) => {
                        if (!authState) {
                            const accessToken = this.accessToken
                            const refreshToken = this.refreshToken
                            if (accessToken && refreshToken)
                                return { accessToken, refreshToken }
                            return null
                        }

                        const result = await mutate<
                            RefreshMutation,
                            RefreshMutationVariables
                        >(RefreshDocument, {
                            token: (authState as any).refreshToken
                        })

                        if (result.data?.refresh) {
                            this.accessToken = result.data.refresh.accessToken
                            this.refreshToken = result.data.refresh.refreshToken

                            return {
                                accessToken: this.accessToken,
                                refreshToken: this.refreshToken
                            }
                        }

                        this.logout()
                        return null
                    },
                    addAuthToOperation: ({ authState, operation }) => {
                        if (!authState || !(authState as any).accessToken)
                            return operation

                        const fetchOptions =
                            typeof operation.context.fetchOptions === "function"
                                ? operation.context.fetchOptions()
                                : operation.context.fetchOptions || {}

                        return makeOperation(operation.kind, operation, {
                            ...operation.context,
                            fetchOptions: {
                                ...fetchOptions,
                                headers: {
                                    ...fetchOptions.headers,
                                    Authorization: `Bearer ${this.accessToken}`
                                }
                            }
                        })
                    },
                    didAuthError: ({ error }) => {
                        return error.graphQLErrors.some(
                            (e) => e.extensions?.code === "UNAUTHENTICATED"
                        )
                    }
                }),
                fetchExchange
            ]
        })

        if (this.refreshToken) {
            console.log("REFRESH TOKEN")
            this.state.next(AuthState.AUTHENTICATED)
        } else this.state.next(AuthState.UNAUTHENTICATED)
    }

    get urqlClient() {
        return this.client
    }

    get refreshToken(): string | null {
        return window.localStorage.getItem("com.distr.tokens.refresh")
    }

    get accessToken(): string | null {
        return window.localStorage.getItem("com.distr.tokens.access")
    }

    private set refreshToken(value: string | null) {
        if (value)
            window.localStorage.setItem("com.distr.tokens.refresh", value)
        else window.localStorage.removeItem("com.distr.tokens.refresh")
    }

    private set accessToken(value: string | null) {
        if (value) window.localStorage.setItem("com.distr.tokens.access", value)
        else window.localStorage.removeItem("com.distr.tokens.access")
    }

    /**
     * Create a new session
     * @param tokens Session tokens
     */
    login(tokens: { accessToken: string; refreshToken: string }) {
        this.accessToken = tokens.accessToken
        this.refreshToken = tokens.refreshToken
        this.state.next(AuthState.AUTHENTICATED)
    }

    /**
     * Logout the current user
     */
    logout() {
        this.accessToken = null
        this.refreshToken = null
        this.state.next(AuthState.UNAUTHENTICATED)
    }
}
