import { useForm } from 'react-hook-form';
import { Button } from '../../../../../components/Button';
import { Input } from '../../../../../components/Input';
import { ResourceDetails } from '../../../../../components/ResourceDetails';
import {
	Property as PropertyType,
	Status,
} from '../../../../../generated/graphql';
import { IUsage } from '../../components/Deployment/components/Resource/components/Usage';
import { ServiceSideBar } from '../components/ServiceSideBar';

interface IResourceDetailsScreen {
	next: (id: string) => void;
}
const ResourceDetailsScreen = ({ next }: IResourceDetailsScreen) => {
	const properties: PropertyType[] = [
		{
			name: 'name',
			value: {
				stringValue: 'uplevyl-staging',
			},
		},
		{
			name: 'space',
			value: {
				numberValue: 50,
			},
		},
		{
			name: 'backups',
			value: {
				boolValue: true,
			},
		},
		{
			name: 'Group',
			value: {
				structValue: {
					fields: {
						field: 'Any',
					},
				},
			},
		},
	];
	const resource = {
		id: '1',
		service: {
			name: 'S3',
		},
		details: properties,
		status: Status.Healthy,
		usage: {
			type: 'limited',
			current: 20,
			limit: 100,
		} as IUsage,
	};

	const { handleSubmit, register } = useForm();

	const handleCreate = () => {
		next('resourceId');
	};

	return (
		<div className="flex justify-end flex-col md:flex-row">
			<div className="w-full p-4 flex flex-col items-start max-h-full">
				<div className="w-full md:w-1/2 lg:2/5 max-h-full">
					<h2 className="text-2xl">{resource.service.name}</h2>
					<p className="mt-4 font-light">
						Your resource has been created.
					</p>
					<p className="mt-4 font-light">Give it a name:</p>
					<form action="" className="mt-6">
						<Input placeholder={resource.service.name} />
						<Button
							onClick={handleSubmit(handleCreate)}
							className="mt-4 w-full"
						>
							Save Resource
						</Button>
					</form>
					<hr className="my-8" />
					<ResourceDetails {...resource} />
				</div>
			</div>
			<ServiceSideBar id="1234" />
		</div>
	);
};
export default ResourceDetailsScreen;
