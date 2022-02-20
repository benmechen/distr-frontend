import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Emphasis } from "../../../components/Emphasis"
import { LoadingWrapper } from "../../../components/LoadingWrapper"
import {
    IsRegisteredQueryVariables,
    useIsRegisteredQuery
} from "../../../generated/graphql"
import { useLazyQuery } from "../../../utils/useLazyQuery"
import { WelcomeForm } from "./components/WelcomeForm"
import { IWelcomeFormData } from "./components/WelcomeForm/WelcomeForm"

const WelcomeScreen = () => {
    const navigate = useNavigate()
    const [{ data, fetching, error }, checkRegistered] = useLazyQuery(
        useIsRegisteredQuery
    )

    useEffect(() => {
        if (error) return console.error(error)
        if (data) {
            if (data.userRegistered) navigate("/login")
            else navigate("/register")
        }
    }, [data, error])

    const handleSubmit: SubmitHandler<IWelcomeFormData> = (data) =>
        checkRegistered({
            email: data.email
        })

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl text-center mb-10 text-black">
                Log in to <br />
                <Emphasis>DISTR</Emphasis>
            </h1>
            <LoadingWrapper loading={fetching}>
                <WelcomeForm onSubmit={handleSubmit} />
            </LoadingWrapper>
        </div>
    )
}
export default WelcomeScreen