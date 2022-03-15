import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../../../../components/Button';
import { Input } from '../../../../../../../components/Input';

export interface ICreateSystemFormData {
    name: string;
}

interface ICreateSystemForm {
    onSubmit: SubmitHandler<ICreateSystemFormData>;
}

const CreateSystemForm = ({ onSubmit }: ICreateSystemForm) => {
    const { handleSubmit, register } = useForm<ICreateSystemFormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
                placeholder="Name"
                {...register('name', { required: true })}
            />
            <Button>Create System</Button>
        </form>
    );
};
export default CreateSystemForm;
