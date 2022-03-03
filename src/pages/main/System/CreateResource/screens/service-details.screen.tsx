import { useForm } from 'react-hook-form';
import { Button } from '../../../../../components/Button';
import { Field, FieldType } from '../../../../../generated/graphql';
import { Field as FieldInput } from '../components/Field';
import { ServiceSideBar } from '../components/ServiceSideBar';

interface IServiceDetailsScreen {
	serviceId: string;
	next: (id: string) => void;
}
const ServiceDetailsScreen = ({ next }: IServiceDetailsScreen) => {
	const fields: Field[] = [
		{
			name: 'name',
			required: true,
			type: FieldType.String,
			description: 'Give the bucket a unique name',
		},
		{
			name: 'space',
			required: false,
			type: FieldType.Number,
			description: 'Maximum space (GB)',
		},
		{
			name: 'backups',
			required: false,
			type: FieldType.Boolean,
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
	const service = {
		id: '1',
		name: 'S3',
		inputs: fields,
	};

	const { handleSubmit, register } = useForm();

	const handleCreate = () => {
		next('resourceId');
	};

	return (
		<div className="flex justify-end flex-col md:flex-row">
			<div className="w-full p-4 flex flex-col items-start max-h-full">
				<div className="w-full md:w-3/4 max-h-full">
					<h2 className="text-2xl">{service.name}</h2>
					<p className="mt-4 font-light">
						Fill out the details below.
					</p>
					<form action="" className="w-full md:w-1/2 lg:2/5 mt-6">
						{service.inputs.map((field) => (
							<FieldInput
								className="mt-4"
								{...field}
								{...register(field.name)}
							/>
						))}
						<Button
							onClick={handleSubmit(handleCreate)}
							className="mt-8 w-full"
						>
							Create Resource
						</Button>
					</form>
				</div>
			</div>
			<ServiceSideBar id="1234" />
		</div>
	);
};
export default ServiceDetailsScreen;
