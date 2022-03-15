import { UserMinus, UserPlus } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { Button, TertiaryButton } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { useModal } from '../../../../components/Modal';
import {
	useAddMemberMutation,
	useGetOrganisationQuery,
	useRemoveMemberMutation,
	useUpdateOrganisationMutation,
} from '../../../../generated/graphql';
import { Layout } from '../../Layout';
import { AddMemberForm, IAddMemberFormData } from './components/AddMemberForm';

interface IOrganisationSettingsData {
	name: string;
}

const OrganisationSettingsScreen = () => {
	const [{ data, fetching }] = useGetOrganisationQuery();
	const [{ fetching: updating }, updateOrganisation] =
		useUpdateOrganisationMutation();
	const [{ fetching: adding }, addMember] = useAddMemberMutation();
	const [{ fetching: removing }, removeMember] = useRemoveMemberMutation();
	const [Modal, { open, close }] = useModal();

	const { handleSubmit, register } = useForm<IOrganisationSettingsData>({
		defaultValues: {
			name: data?.me.organisation.name,
		},
	});

	const handleSave = async (input: IOrganisationSettingsData) => {
		if (!data) return;
		await updateOrganisation({
			id: data?.me.organisation.id,
			input,
		});
	};

	const handleAddMember = async (input: IAddMemberFormData) => {
		if (!data) return;
		const { error } = await addMember({
			organisationID: data.me.organisation.id,
			input,
		});
		if (!error) close();
	};

	const handleRemoveMember = async (id: string) => {
		if (!data) return;
		await removeMember({
			organisationID: data.me.organisation.id,
			memberID: id,
		});
	};

	return (
		<Layout
			title={{
				main: 'Account Settings',
			}}
		>
			<Modal title="Add Member">
				<AddMemberForm onSubmit={handleAddMember} />
			</Modal>
			<LoadingWrapper
				loading={fetching || updating || adding || removing}
			>
				<div className="p-4">
					<h2 className="text-lg font-semibold">
						Update your organisation's details
					</h2>
					<form
						onSubmit={handleSubmit(handleSave)}
						className="my-4 max-w-sm"
					>
						<Input
							placeholder="Name"
							{...register('name')}
							className="mb-2"
						/>
						<Button type="submit">Save Changes</Button>
					</form>
					<h2 className="text-lg font-semibold mb-4">
						Your organisation's members
					</h2>
					{data?.me.organisation.members.map((member) => (
						<div className="w-60 p-2 border-t border-gray-100 flex justify-between items-center">
							{member.name}
							{member.id !== data.me.id && (
								<button
									className="text-xs uppercase text-indigo-500 flex"
									onClick={() =>
										handleRemoveMember(member.id)
									}
								>
									Remove
									<UserMinus size={16} className="ml-1" />
								</button>
							)}
						</div>
					))}
					<div className="w-60 p-2 border-t border-b border-gray-100 flex justify-between items-center">
						<button
							className="text-xs uppercase text-indigo-500 flex"
							onClick={open}
						>
							Add Member
							<UserPlus size={16} className="ml-1" />
						</button>
					</div>
					<TertiaryButton className="mt-4">
						Delete Organisation
					</TertiaryButton>
				</div>
			</LoadingWrapper>
		</Layout>
	);
};

export default OrganisationSettingsScreen;
