import { Plus } from 'phosphor-react';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { useModal } from '../../../../../components/Modal';
import {
	DeploymentCredentialsInput,
	useCreateDeploymentMutation,
} from '../../../../../generated/graphql';
import {
	DeploymentForm,
	IDeploymentFormData,
} from '../Deployment/components/DeploymentForm';

interface ICreateDeploymentButton {
	systemID: string;
}
const CreateDeploymentButton = ({ systemID }: ICreateDeploymentButton) => {
	const [Modal, { open, close }] = useModal();
	const [{ fetching: creating }, createDeployment] =
		useCreateDeploymentMutation();

	const handleCreateDeployment = async (data: IDeploymentFormData) => {
		const credentials: DeploymentCredentialsInput = {};
		if (data.aws_id && data.aws_secret && data.aws_region)
			credentials.aws = {
				id: data.aws_id,
				secret: data.aws_secret,
				region: data.aws_region,
			};
		if (data.azure_clientId && data.azure_tenantId && data.azure_secret)
			credentials.azure = {
				clientId: data.azure_clientId,
				tenantId: data.azure_tenantId,
				secret: data.azure_secret,
			};

		await createDeployment({
			systemID,
			input: {
				name: data.name,
				credentials,
			},
		});

		close();
	};

	return (
		<>
			<Modal title="Create Deployment">
				<LoadingWrapper loading={creating}>
					<DeploymentForm
						type="create"
						onSubmit={handleCreateDeployment}
					/>
				</LoadingWrapper>
			</Modal>
			<button
				className="rounded-l-full w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 fixed p-5 flex transition-transform duration-150 hover:-translate-x-1"
				style={{
					right: '-2rem',
					top: '50%',
				}}
				onClick={open}
			>
				<Plus color="white" width="100%" className="-translate-x-3" />
			</button>
		</>
	);
};

export default CreateDeploymentButton;
