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
	Limit,
	useDeleteResourceMutation,
	useGetResourceQuery,
} from '../../../../generated/graphql';
import { Layout } from '../../Layout';
import { ServiceSideBar } from '../CreateResource/components/ServiceSideBar';

const ResourceScreen = () => {
	const navigate = useNavigate();
	const { resourceId } = useParams();
	const { register } = useForm();
	const [Modal, { open, close }] = useModal();

	const [{ data, fetching }] = useGetResourceQuery({
		variables: {
			id: resourceId ?? '',
		},
	});
	const [{ fetching: deleting }, deleteResource] =
		useDeleteResourceMutation();

	const handleDelete = async () => {
		if (!resourceId) return;
		await deleteResource({
			id: resourceId,
		});
		navigate(-1);
	};

	return (
		<>
			<Modal title="Delete Resource">
				<p>Are you sure you want to delete this resource?</p>
				<Button onClick={close} className="mt-4 mr-2">
					Cancel
				</Button>
				<SecondaryButton onClick={handleDelete}>Delete</SecondaryButton>
			</Modal>
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
								<h2 className="text-2xl mb-8">
									{data?.resource.name}
								</h2>
								{data?.resource && (
									<ResourceDetails
										{...data.resource}
										usage={
											data.resource.usage.type ===
											Limit.Limited
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
								<TertiaryButton className="mt-6" onClick={open}>
									Delete Resource
								</TertiaryButton>
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
