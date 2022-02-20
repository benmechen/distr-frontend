import React from "react"
import { Loading } from "../Loading"

interface ILoadingWrapper {
    loading: boolean
    children: React.ReactNode
}

const LoadingWrapper = ({ loading, children }: ILoadingWrapper) => {
    if (!loading) return <>{children}</>

    return <Loading />
}
export default LoadingWrapper
