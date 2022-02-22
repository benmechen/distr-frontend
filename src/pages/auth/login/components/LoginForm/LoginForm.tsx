import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../../../../../components/Button"
import { Input } from "../../../../../components/Input"

export interface ILoginFormData {
    email: string
    password: string
}

interface ILoginForm {
    email?: string
    onSubmit: SubmitHandler<ILoginFormData>
}

const LoginForm = ({ email, onSubmit }: ILoginForm) => {
    const { handleSubmit, register } = useForm<ILoginFormData>({
        defaultValues: {
            email
        }
    })
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-80"
        >
            <Input
                placeholder="Email"
                disabled={!!email}
                {...register("email", { required: true })}
            />
            <Input
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
            />
            <Button type="submit">Log In</Button>
        </form>
    )
}
export default LoginForm
