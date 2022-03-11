import { useForm } from 'react-hook-form';
import { Button, TertiaryButton } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import {
	useGetMeQuery,
	useUpdateUserMutation,
} from '../../../../generated/graphql';
import { diff } from '../../../../utils/helper.service';
import { Layout } from '../../Layout';

interface IAccountSettingsData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const AccountSettingsScreen = () => {
	const [{ data, fetching }] = useGetMeQuery();
	const [{ fetching: updating }, updateUser] = useUpdateUserMutation();

	const { handleSubmit, register } = useForm<IAccountSettingsData>({
		defaultValues: {
			firstName: data?.me.firstName,
			lastName: data?.me.lastName,
			email: data?.me.email,
		},
	});

	const handleSave = async (input: IAccountSettingsData) => {
		if (!data) return;
		await updateUser({
			id: data?.me.id,
			input: {
				...diff(input, data.me),
				password:
					input.password.trim().length > 0
						? input.password
						: undefined,
			},
		});
	};

	return (
		<Layout
			title={{
				main: 'Account Settings',
			}}
		>
			<LoadingWrapper loading={fetching || updating}>
				<div className="p-4">
					<h2 className="text-lg font-semibold">
						Update your account details
					</h2>
					<form
						onSubmit={handleSubmit(handleSave)}
						className="my-4 max-w-sm"
					>
						<Input
							placeholder="First Name"
							{...register('firstName')}
							className="mb-2"
						/>
						<Input
							placeholder="Last Name"
							{...register('lastName')}
							className="mb-2"
						/>
						<Input
							placeholder="Email"
							type="email"
							{...register('email')}
							className="mb-2"
						/>
						<Input
							placeholder="Password"
							type="password"
							{...register('password')}
							className="mb-4"
						/>
						<Button type="submit">Save Changes</Button>
					</form>
					<TertiaryButton className="mt-2">
						Delete Account
					</TertiaryButton>
				</div>
			</LoadingWrapper>
		</Layout>
	);
};

export default AccountSettingsScreen;
