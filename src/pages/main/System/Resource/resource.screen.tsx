import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Button,
	SecondaryButton,
	TertiaryButton,
} from '../../../../components/Button';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { useModal } from '../../../../components/Modal';
import { ResourceDetails } from '../../../../components/ResourceDetails';
import {
	UsageType,
	useDeleteResourceMutation,
	useGetResourceQuery,
	useUpdateResourceMutation,
} from '../../../../generated/graphql';
import { transformInputs } from '../../../../utils/helper.service';
import { Layout } from '../../Layout';
import { ServiceSideBar } from '../CreateResource/components/ServiceSideBar';
import { EditResourceForm } from './components/EditResourceForm';
import {
	IRenameResourceFormData,
	RenameResourceForm,
} from './components/RenameResourceForm';

const ResourceScreen = () => {
	const navigate = useNavigate();
	const { resourceId } = useParams();
	const { register } = useForm();
	const [DeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
		useModal();
	const [
		EditModal,
		{ open: openEditModal, close: closeEditModal, isOpen: editModalOpen },
	] = useModal();
	const [RenameModal, { open: openRenameModal, close: closeRenameModal }] =
		useModal();
	const [nameHover, setNameHover] = useState(false);

	const [{ data, fetching }] = useGetResourceQuery({
		variables: {
			id: resourceId ?? '',
		},
	});

	const [{ fetching: updating }, updateResource] =
		useUpdateResourceMutation();
	const [{ fetching: deleting }, deleteResource] =
		useDeleteResourceMutation();

	const handleUpdate = async (data: Record<string, any>) => {
		if (!resourceId) return;
		await updateResource({
			id: resourceId,
			input: {
				input: transformInputs(data),
			},
		});
		closeEditModal();
	};

	const handleRename = async (data: IRenameResourceFormData) => {
		if (!resourceId) return;
		await updateResource({
			id: resourceId,
			input: data,
		});
		closeRenameModal();
	};

	const handleDelete = async () => {
		if (!resourceId) return;
		await deleteResource({
			id: resourceId,
		});
		closeDeleteModal();
		navigate(-1);
	};

	return (
		<>
			<DeleteModal title="Delete Resource">
				<p>Are you sure you want to delete this resource?</p>
				<Button onClick={closeDeleteModal} className="mt-4 mr-2">
					Cancel
				</Button>
				<SecondaryButton onClick={handleDelete}>Delete</SecondaryButton>
			</DeleteModal>
			<EditModal title="Edit Resource">
				<LoadingWrapper loading={updating}>
					<EditResourceForm
						serviceId={data?.resource.service.id ?? ''}
						details={data?.resource.details}
						handleUpdate={handleUpdate}
					/>
				</LoadingWrapper>
			</EditModal>
			<RenameModal title="Rename Resource">
				<LoadingWrapper loading={updating}>
					<RenameResourceForm
						currentName={data?.resource.name}
						handleUpdate={handleRename}
					/>
				</LoadingWrapper>
			</RenameModal>
			<Layout
				title={{
					main: data?.resource.deployment.name ?? 'Deployment',
					emphasis: 'Resource',
				}}
				onBack={() => navigate(-1)}
			>
				<LoadingWrapper loading={fetching || deleting}>
					<div className="flex justify-end flex-col md:flex-row">
						<div className="w-full p-4 flex flex-col items-start max-h-full">
							<div className="w-full md:w-1/2 lg:2/5 max-h-full">
								<h2
									className="text-2xl mb-8"
									onMouseEnter={() => setNameHover(true)}
									onMouseLeave={() => setNameHover(false)}
								>
									{data?.resource.name}
									<button
										onClick={openRenameModal}
										className={`text-xs uppercase text-indigo-500 align-top px-2 transition-opacity duration-150 ${
											nameHover
												? 'opacity-100'
												: 'opacity-0'
										}`}
									>
										Change
									</button>
								</h2>
								{data?.resource && (
									<ResourceDetails
										{...data.resource}
										usage={
											data.resource.usage?.type ===
											UsageType.Limited
												? {
														current:
															data.resource.usage
																.current ?? 0,
														limit:
															data.resource.usage
																.limit ?? 0,
														type: 'limited',
												  }
												: { type: 'unlimited' }
										}
										register={register}
									/>
								)}
								<div className="flex flex-col mt-6">
									<TertiaryButton onClick={openEditModal}>
										Edit Resource
									</TertiaryButton>
									<TertiaryButton
										className="mt-2"
										onClick={openDeleteModal}
									>
										Delete Resource
									</TertiaryButton>
								</div>
							</div>
						</div>
						{data && (
							<ServiceSideBar id={data?.resource.service.id} />
						)}
					</div>
				</LoadingWrapper>
			</Layout>
		</>
	);
};
export default ResourceScreen;
