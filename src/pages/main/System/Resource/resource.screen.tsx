import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ResourceDetails } from '../../../../components/ResourceDetails';
import { Field, FieldType, Status } from '../../../../generated/graphql';
import { Layout } from '../../Layout';
import { IUsage } from '../components/Deployment/components/Resource/components/Usage';
import { ServiceSideBar } from '../CreateResource/components/ServiceSideBar';

const ResourceScreen = () => {
	const navigate = useNavigate();
	const { register } = useForm();

	const fields: Field[] = [
		{
			name: 'name',
			required: true,
			type: FieldType.String,
			defaultValue: {
				stringValue: 'uplevyl-staging',
			},
			description: 'Give the bucket a unique name',
		},
		{
			name: 'space',
			required: false,
			type: FieldType.Number,
			defaultValue: {
				numberValue: 100,
			},
			description: 'Maximum space (GB)',
		},
		{
			name: 'backups',
			required: false,
			type: FieldType.Boolean,
			defaultValue: {
				boolValue: true,
			},
			description: 'Enable backups?',
		},
		{
			name: 'Group',
			description: 'Description of group',
			required: false,
			type: FieldType.Struct,
			fields: [
				{
					name: 'Field',
					description: 'Description',
					required: true,
					type: FieldType.String,
				},
			],
		},
	];
	const resource = {
		id: '1',
		deployment: {
			name: 'Staging',
			service: {
				name: 'S3',
			},
		},
		fields,
		status: Status.Healthy,
		usage: {
			type: 'limited',
			current: 20,
			limit: 100,
		} as IUsage,
	};

	return (
		<Layout
			title={{
				main: resource.deployment.name,
				emphasis: 'Resource',
			}}
			onBack={() => navigate(-1)}
		>
			<div className="flex justify-end flex-col md:flex-row">
				<div className="w-full p-4 flex flex-col items-start max-h-full">
					<div className="w-full md:w-1/2 lg:2/5 max-h-full">
						<h2 className="text-2xl mb-8">
							{resource.deployment.service.name}
						</h2>
						<ResourceDetails {...resource} register={register} />
					</div>
				</div>
				<ServiceSideBar id="1234" />
			</div>{' '}
		</Layout>
	);
};
export default ResourceScreen;
