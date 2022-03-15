import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../../../components/Button';
import { Input } from '../../../../../../components/Input';

export interface IAddMemberFormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface IAddMemberForm {
	onSubmit: SubmitHandler<IAddMemberFormData>;
}

const AddMemberForm = ({ onSubmit }: IAddMemberForm) => {
	const { handleSubmit, register } = useForm<IAddMemberFormData>();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				placeholder="First Name"
				{...register('firstName')}
				className="mb-4"
			/>
			<Input
				placeholder="Last Name"
				{...register('lastName')}
				className="mb-4"
			/>
			<Input
				placeholder="Email"
				type="email"
				{...register('email')}
				className="mb-4"
			/>
			<Input
				placeholder="Password"
				type="password"
				{...register('password')}
				className="mb-4"
			/>
			<Button>Create Member</Button>
		</form>
	);
};
export default AddMemberForm;
