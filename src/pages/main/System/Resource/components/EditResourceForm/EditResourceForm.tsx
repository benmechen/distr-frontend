import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../../../components/Button';
import {
	Method,
	Property,
	useGetServiceInputsQuery,
} from '../../../../../../generated/graphql';
import { Field as FieldInput } from '../../../CreateResource/components/Field';

interface IEditResourceForm {
	serviceId: string;
	details?: Property[];
	handleUpdate: SubmitHandler<any>;
}
const EditResourceForm = ({
	serviceId,
	details,
	handleUpdate,
}: IEditResourceForm) => {
	const [{ data }] = useGetServiceInputsQuery({
		variables: {
			id: serviceId,
			method: Method.Update,
		},
	});

	const getDefaultValues = (details?: Property[]) => {
		const defaultValues: Record<string, any> = {};

		details?.map(({ name, value }) => {
			defaultValues[name] =
				value?.stringValue ??
				value?.boolValue ??
				value?.numberValue ??
				getDefaultValues(value?.structValue?.fields);
		});

		return defaultValues;
	};

	const { handleSubmit, register } = useForm<any>({
		defaultValues: getDefaultValues(details),
	});

	return (
		<form className="w-full">
			{data?.service?.inputs.map((field, i) => (
				<FieldInput
					key={field.name}
					className={i > 0 ? 'mt-4' : ''}
					{...field}
					{...register(field.name)}
				/>
			))}
			<Button
				onClick={handleSubmit(handleUpdate)}
				className="mt-8 w-full"
			>
				Save Changes
			</Button>
		</form>
	);
};
export default EditResourceForm;
