import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../../../components/Button';
import { Input } from '../../../../../../components/Input';

export interface IRenameResourceFormData {
	name: string;
}

interface IRenameResourceForm {
	currentName?: string;
	handleUpdate: SubmitHandler<IRenameResourceFormData>;
}
const RenameResourceForm = ({
	currentName,
	handleUpdate,
}: IRenameResourceForm) => {
	const { handleSubmit, register } = useForm<IRenameResourceFormData>({
		defaultValues: {
			name: currentName,
		},
	});

	return (
		<form onSubmit={handleSubmit(handleUpdate)}>
			<Input type="text" placeholder="name" {...register('name')} />
			<Button type="submit" className="mt-4">
				Save Changes
			</Button>
		</form>
	);
};
export default RenameResourceForm;
