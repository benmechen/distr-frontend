import {
    cacheExchange,
    Client,
    createClient,
    dedupExchange,
    errorExchange,
    fetchExchange
} from "urql"

interface IError {
    message: string
    code: string
}

export class ClientService {
    private client: Client

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
                fetchExchange
            ]
        })
    }

    get urqlClient() {
        return this.client
    }
}
