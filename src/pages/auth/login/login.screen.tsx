import { SubmitHandler } from "react-hook-form"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { Emphasis } from "../../../components/Emphasis"
import { LoadingWrapper } from "../../../components/LoadingWrapper"
import { useLoginMutation } from "../../../generated/graphql"
import { useMainContext } from "../../../main.provider"
import { ILoginFormData, LoginForm } from "./components/LoginForm"

const LoginScreen = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const location = useLocation()
    const { clientService } = useMainContext()
    const [{ fetching }, login] = useLoginMutation()

    const from = (location.state as any)?.from?.pathname ?? "/"

    const handleLogin: SubmitHandler<ILoginFormData> = async (input) => {
        const { data } = await login(input)

        if (data?.login) {
            clientService?.login(data.login)
            navigate(from, { replace: true })
        }
        return navigate("/")
    }

    if (!(state as any)?.email || !(state as any)?.name)
        return <Navigate to="/welcome" />

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl text-center mb-10 text-black">
                Hello,&nbsp;
                <Emphasis>{(state as { name: string })?.name}</Emphasis>
            </h1>
            <LoadingWrapper loading={fetching}>
                <LoginForm
                    email={(state as { email: string })?.email}
                    onSubmit={handleLogin}
                />
            </LoadingWrapper>
        </div>
    )
}
export default LoginScreen
