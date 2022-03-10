import {
	Field,
	Property as PropertyType,
	Status,
} from '../../generated/graphql';
import {
	IUsage,
	Usage,
} from '../../pages/main/System/components/Deployment/components/Resource/components/Usage';
import { Property } from '../../pages/main/System/CreateResource/components/Property';
import { Field as FieldInput } from '../../pages/main/System/CreateResource/components/Field';
import { StatusIndicator } from '../StatusIndicator';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IResource {
	id: string;
	details?: PropertyType[];
	fields?: Field[];
	status: Status;
	usage: IUsage;
	register?: UseFormRegister<FieldValues>;
}
const ResourceDetails = ({
	status,
	usage,
	details,
	fields,
	register,
}: IResource) => (
	<>
		<p className="font-medium">
			Status: <StatusIndicator status={status} />
			<span className="text uppercase font-light ml-1">{status}</span>
		</p>
		<p className="font-medium mb-2">
			Usage:{' '}
			<span className="font-light">
				{usage.type === 'limited'
					? `${usage.current} / ${usage.limit}`
					: 'Unlimited'}
			</span>
		</p>
		<Usage {...usage} />
		<br />
		<h4 className="text-lg font-semibold mb-4">Details</h4>
		{details?.map((property) => (
			<Property key={property.name} {...property} />
		))}
		{fields?.map((field) => (
			<FieldInput
				key={field.name}
				{...field}
				{...register!(field.name)}
			/>
		))}
	</>
);
export default ResourceDetails;
