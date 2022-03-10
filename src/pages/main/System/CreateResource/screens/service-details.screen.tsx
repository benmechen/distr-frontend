import { useForm } from 'react-hook-form';
import { Button } from '../../../../../components/Button';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import {
	Method,
	Property,
	useCreateResourceMutation,
	useGetServiceDetailsQuery,
	useGetServiceInputsQuery,
} from '../../../../../generated/graphql';
import { transformInputs } from '../../../../../utils/helper.service';
import { Field as FieldInput } from '../components/Field';
import { ServiceSideBar } from '../components/ServiceSideBar';

interface IServiceDetailsScreen {
	service: {
		id: string;
		name: string;
	};
	deploymentId: string;
	next: (id: string, details: Property[]) => void;
}
const ServiceDetailsScreen = ({
	service,
	deploymentId,
	next,
}: IServiceDetailsScreen) => {
	const [{ fetching: creating }, createResource] =
		useCreateResourceMutation();
	const [{ data, fetching }] = useGetServiceDetailsQuery({
		variables: {
			id: service.id,
		},
	});
	const [{ data: inputsData, fetching: fetchingInputs }] =
		useGetServiceInputsQuery({
			variables: {
				id: service.id,
				method: Method.Create,
			},
		});

	const { handleSubmit, register } = useForm();

	const handleCreate = async (input: Record<string, any>) => {
		const { data } = await createResource({
			deploymentID: deploymentId,
			input: {
				name: service.name,
				serviceID: service.id,
				input: transformInputs(input),
			},
		});

		if (!data?.resourceCreate.resource.id) return;
		next(data.resourceCreate.resource.id, data.resourceCreate.details);
	};

	return (
		<LoadingWrapper loading={fetching || creating}>
			<div className="flex justify-end flex-col md:flex-row">
				<div className="w-full p-4 flex flex-col items-start max-h-full">
					<div className="w-full md:w-3/4 max-h-full">
						<h2 className="text-2xl">{data?.service?.name}</h2>
						<p className="mt-4 font-light">
							Fill out the details below.
						</p>
						<form className="w-full md:w-1/2 lg:2/5 mt-6">
							{inputsData?.service?.inputs.map((field) => (
								<FieldInput
									key={field.name}
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
				<ServiceSideBar id={service.id} />
			</div>
		</LoadingWrapper>
	);
};
export default ServiceDetailsScreen;
