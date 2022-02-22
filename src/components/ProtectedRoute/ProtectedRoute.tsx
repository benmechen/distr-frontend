import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Loading } from "../Loading"

interface IAuthRoute {
    isLoggedIn: boolean | null
    children: React.ReactNode
}

const ProtectedRoute = ({ isLoggedIn, children }: IAuthRoute) => {
    const location = useLocation()

    if (isLoggedIn === null) return <Loading />
    if (!isLoggedIn)
        return (
            <Navigate to="/auth/welcome" state={{ from: location }} replace />
        )

    return <>{children}</>
}
export default ProtectedRoute
