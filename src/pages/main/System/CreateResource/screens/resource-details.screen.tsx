import { useForm } from 'react-hook-form';
import { Button } from '../../../../../components/Button';
import { Input } from '../../../../../components/Input';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { ResourceDetails } from '../../../../../components/ResourceDetails';
import {
	UsageType,
	useGetResourceQuery,
	useUpdateResourceMutation,
} from '../../../../../generated/graphql';
import { ServiceSideBar } from '../components/ServiceSideBar';

interface IResourceDetailsData {
	name: string;
}

interface IResourceDetailsScreen {
	id: string;
	next: (id: string) => void;
}
const ResourceDetailsScreen = ({ id, next }: IResourceDetailsScreen) => {
	const [{ data, fetching }] = useGetResourceQuery({
		variables: {
			id,
		},
	});
	const [{ fetching: updating }, updateResource] =
		useUpdateResourceMutation();

	const { handleSubmit, register } = useForm<IResourceDetailsData>();

	const handleRename = async (data: IResourceDetailsData) => {
		await updateResource({
			id,
			input: data,
		});
		next(id);
	};

	return (
		<LoadingWrapper loading={fetching || updating}>
			<div className="flex justify-end flex-col md:flex-row">
				<div className="w-full p-4 flex flex-col items-start max-h-full">
					<div className="w-full md:w-1/2 lg:2/5 max-h-full">
						<h2 className="text-2xl">
							{data?.resource.service.name}
						</h2>
						<p className="mt-4 font-light">
							Your resource has been created.
						</p>
						<p className="mt-4 font-light">Give it a name:</p>
						<form action="" className="mt-6">
							<Input
								placeholder="Name"
								defaultValue={data?.resource.service.name}
								{...register('name')}
							/>
							<Button
								onClick={handleSubmit(handleRename)}
								className="mt-4 w-full"
							>
								Save Resource
							</Button>
						</form>
						<hr className="my-8" />
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
													data.resource.usage.limit ??
													0,
												type: 'limited',
										  }
										: { type: 'unlimited' }
								}
							/>
						)}
					</div>
				</div>
				{data?.resource && (
					<ServiceSideBar id={data.resource.service.id} />
				)}
			</div>
		</LoadingWrapper>
	);
};
export default ResourceDetailsScreen;
