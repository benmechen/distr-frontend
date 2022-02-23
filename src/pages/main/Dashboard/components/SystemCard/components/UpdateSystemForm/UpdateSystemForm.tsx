import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../../../../components/Button';
import { Input } from '../../../../../../../components/Input';

export interface IUpdateSystemFormData {
	name: string;
}

interface IUpdateSystemForm {
	name?: string;
	onSubmit: SubmitHandler<IUpdateSystemFormData>;
}

const UpdateSystemForm = ({ name, onSubmit }: IUpdateSystemForm) => {
	const { handleSubmit, register } = useForm<IUpdateSystemFormData>({
		defaultValues: {
			name,
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Input
				placeholder="Name"
				{...register('name', { required: true })}
			/>
			<Button>Save Changes</Button>
		</form>
	);
};
export default UpdateSystemForm;