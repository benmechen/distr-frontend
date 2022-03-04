import { Button, SecondaryButton } from '../../../../../components/Button';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { useModal } from '../../../../../components/Modal';
import { OptionsButton } from '../../../../../components/OptionsButton';
import { StatusHeader } from '../../../../../components/StatusHeader';
import {
	ResourceRowFragment,
	useDeleteDeploymentMutation,
} from '../../../../../generated/graphql';
import { CreateResourceButton } from './components/CreateResourceButton';
import { DeploymentForm } from './components/DeploymentForm';
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

	const [{ fetching: deleting }, deleteDeployment] =
		useDeleteDeploymentMutation();

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
					<Button onClick={close} className="mt-4 mr-2">
						Cancel
					</Button>
					<SecondaryButton onClick={handleDelete}>
						Delete
					</SecondaryButton>
				</LoadingWrapper>
			</DeleteModal>
			<EditModal title={name}>
				<DeploymentForm
					type="update"
					name={name}
					onSubmit={() => {}}
					onDeleteClick={() => {
						closeEditModal();
						openDeleteModal();
					}}
				/>
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
