import { useCallback, useEffect, useRef, useState } from "react"
import * as Urql from "urql"
import { UseQueryArgs, UseQueryResponse } from "urql"

export const useLazyQuery = <Variables extends unknown = any, Data = object>(
    queryFn: (
        options?: Omit<UseQueryArgs<Variables, any>, "query">
    ) => UseQueryResponse<Data, object>
): [Urql.UseQueryState<Data, object>, (variables: Variables) => void] => {
    const firstUpdate = useRef(true)
    const [variables, setVariables] = useState<Variables>()
    const [result, refetch] = queryFn({
        pause: true,
        variables
    })

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        refetch()
    }, [variables])

    const makeRequest = useCallback(
        (reqVariables) => setVariables(reqVariables),
        []
    )

    return [result, makeRequest]
}
