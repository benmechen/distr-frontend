import { Button, SecondaryButton } from '../../../../../components/Button';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { useModal } from '../../../../../components/Modal';
import { OptionsButton } from '../../../../../components/OptionsButton';
import { StatusHeader } from '../../../../../components/StatusHeader';
import {
	DeploymentCredentialsInput,
	ResourceRowFragment,
	useDeleteDeploymentMutation,
	useUpdateDeploymentMutation,
} from '../../../../../generated/graphql';
import { CreateResourceButton } from './components/CreateResourceButton';
import {
	DeploymentForm,
	IDeploymentFormData,
} from './components/DeploymentForm';
import { Resource } from './components/Resource';

export interface IDeployment {
	id: string;
	name: string;
	status: {
		healthy: number;
		unhealthy: number;
	};
	resources: ResourceRowFragment[];
}

const Deployment = ({ id, name, status, resources }: IDeployment) => {
	const [EditModal, { open: openEditModal, close: closeEditModal }] =
		useModal();
	const [DeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
		useModal();

	const [{ fetching: editing }, updateDeployment] =
		useUpdateDeploymentMutation();
	const [{ fetching: deleting }, deleteDeployment] =
		useDeleteDeploymentMutation();

	const handleUpdate = async (data: IDeploymentFormData) => {
		const credentials: DeploymentCredentialsInput = {};
		if (data.aws_id && data.aws_secret && data.aws_region)
			credentials.aws = {
				id: data.aws_id,
				secret: data.aws_secret,
				region: data.aws_region,
			};
		if (data.azure_clientId && data.azure_tenantId && data.azure_secret)
			credentials.azure = {
				clientId: data.azure_clientId,
				tenantId: data.azure_tenantId,
				secret: data.azure_secret,
			};

		await updateDeployment({
			id,
			input: {
				name: data.name,
				credentials,
			},
		});
		closeEditModal();
	};

	const handleDelete = async () => {
		await deleteDeployment({
			id,
		});
		closeDeleteModal();
	};

	return (
		<>
			<DeleteModal title="Delete Deployment">
				<LoadingWrapper loading={deleting}>
					<p>Are you sure you want to delete this deployment?</p>
					<Button onClick={closeDeleteModal} className="mt-4 mr-2">
						Cancel
					</Button>
					<SecondaryButton onClick={handleDelete}>
						Delete
					</SecondaryButton>
				</LoadingWrapper>
			</DeleteModal>
			<EditModal title={name}>
				<LoadingWrapper loading={editing}>
					<DeploymentForm
						type="update"
						name={name}
						onSubmit={handleUpdate}
						onDeleteClick={() => {
							closeEditModal();
							openDeleteModal();
						}}
					/>
				</LoadingWrapper>
			</EditModal>
			<div className="no-scrollbar w-112 pt-4 h-full overflow-y-scroll bg-white rounded-lg shadow-md flex flex-col justify-start items-center gap-6">
				<div className="flex w-full justify-between items-start px-4">
					<StatusHeader {...status} />
					<OptionsButton onClick={openEditModal} />
				</div>
				<h2 className="text-2xl font-bold">{name}</h2>
				<div className="w-full">
					{resources.map((resource) => (
						<Resource
							key={resource.id}
							deploymentId={id}
							{...resource}
						/>
					))}
					<CreateResourceButton deploymentId={id} />
				</div>
			</div>
		</>
	);
};
export default Deployment;
