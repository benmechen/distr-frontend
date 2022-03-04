import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TertiaryButton } from '../../../../../../../components/Button';
import { Input } from '../../../../../../../components/Input';

export interface IUpdateSystemFormData {
	name: string;
}

interface IUpdateSystemForm {
	name?: string;
	onSubmit: SubmitHandler<IUpdateSystemFormData>;
	onDeleteClick?: () => void;
}

const UpdateSystemForm = ({
	name,
	onSubmit,
	onDeleteClick,
}: IUpdateSystemForm) => {
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
			{onDeleteClick && (
				<TertiaryButton className="mt-2" onClick={onDeleteClick}>
					Delete System
				</TertiaryButton>
			)}
		</form>
	);
};
export default UpdateSystemForm;
