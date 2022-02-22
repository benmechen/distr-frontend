import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../../../../../components/Button"
import { Input } from "../../../../../components/Input"

export interface IWelcomeFormData {
    email: string
}

interface IWelcomeForm {
    onSubmit: SubmitHandler<IWelcomeFormData>
}

const WelcomeForm = ({ onSubmit }: IWelcomeForm) => {
    const { handleSubmit, register } = useForm<IWelcomeFormData>()
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-80"
        >
            <Input
                placeholder="Email"
                {...register("email", { required: true })}
            />
            <Button type="submit">Continue</Button>
        </form>
    )
}
export default WelcomeForm
