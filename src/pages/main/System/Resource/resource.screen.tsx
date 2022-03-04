import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { ResourceDetails } from '../../../../components/ResourceDetails';
import { Limit, useGetResourceQuery } from '../../../../generated/graphql';
import { Layout } from '../../Layout';
import { ServiceSideBar } from '../CreateResource/components/ServiceSideBar';

const ResourceScreen = () => {
	const navigate = useNavigate();
	const { resourceId } = useParams();
	const { register } = useForm();

	const [{ data, fetching }] = useGetResourceQuery({
		variables: {
			id: resourceId ?? '',
		},
	});

	return (
		<Layout
			title={{
				main: data?.resource.deployment.name ?? 'Deployment',
				emphasis: 'Resource',
			}}
			onBack={() => navigate(-1)}
		>
			<LoadingWrapper loading={fetching}>
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
						</div>
					</div>
					{data && <ServiceSideBar id={data?.resource.service.id} />}
				</div>
			</LoadingWrapper>
		</Layout>
	);
};
export default ResourceScreen;
