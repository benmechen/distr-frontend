import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../../components/Modal';
import { OptionsButton } from '../../../../../components/OptionsButton';
import { Card } from '../Card';
import { Deployment } from './components/Deployment';
import { StatusHeader } from '../../../../../components/StatusHeader';
import { UpdateSystemForm } from './components/UpdateSystemForm';
import {
	useDeleteSystemMutation,
	useUpdateSystemMutation,
} from '../../../../../generated/graphql';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { Button, SecondaryButton } from '../../../../../components/Button';
import { IUpdateSystemFormData } from './components/UpdateSystemForm/UpdateSystemForm';

export interface ISystemCard {
	id: string;
	name: string;
	status: {
		healthy: number;
		unhealthy: number;
	};
	deployments: {
		id: string;
		name: string;
	}[];
}

const SystemCard = ({ id, name, status, deployments }: ISystemCard) => {
	const navigate = useNavigate();
	const [EditModal, { open: openEditModal, close: closeEditModal }] =
		useModal();
	const [DeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
		useModal();

	const [{ fetching: updating }, updateSystem] = useUpdateSystemMutation();
	const [{ fetching: deleting }, deleteSystem] = useDeleteSystemMutation();

	const handleUpdate = async (data: IUpdateSystemFormData) => {
		await updateSystem({
			id,
			input: data,
		});
		closeEditModal();
	};

	const handleDelete = async () => {
		await deleteSystem({
			id,
		});
		closeDeleteModal();
	};

	const goToSystem = () => navigate(`/system/${id}?name=${name}`);

	return (
		<>
			<DeleteModal title="Delete System">
				<LoadingWrapper loading={deleting}>
					<p>Are you sure you want to delete this system?</p>
					<Button onClick={closeDeleteModal} className="mt-4 mr-2">
						Cancel
					</Button>
					<SecondaryButton onClick={handleDelete}>
						Delete
					</SecondaryButton>
				</LoadingWrapper>
			</DeleteModal>

			<EditModal title={name}>
				<LoadingWrapper loading={updating}>
					<UpdateSystemForm
						name={name}
						onSubmit={handleUpdate}
						onDeleteClick={() => {
							closeEditModal();
							openDeleteModal();
						}}
					/>
				</LoadingWrapper>
			</EditModal>
			<Card onClick={goToSystem} className="z-0">
				<div className="flex w-full justify-between items-start">
					<StatusHeader {...status} />
					<OptionsButton
						onClick={(e) => {
							e.stopPropagation();
							openEditModal();
						}}
					/>
				</div>
				<h2 className="text-3xl font-light">{name}</h2>
				<div className="max-w-full overflow-x-scroll flex gap-2 no-scrollbar">
					{deployments.map((deployment, index) => (
						<Deployment
							key={deployment.id}
							index={index}
							{...deployment}
						/>
					))}
				</div>
			</Card>
		</>
	);
};
export default SystemCard;
