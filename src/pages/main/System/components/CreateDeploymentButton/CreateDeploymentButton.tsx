import { Plus } from 'phosphor-react';
import { useModal } from '../../../../../components/Modal';
import { DeploymentForm } from '../Deployment/components/DeploymentForm';

const CreateDeploymentButton = () => {
	const [Modal, { open }] = useModal();

	return (
		<>
			<Modal title="Create Deployment">
				<DeploymentForm type="create" onSubmit={() => {}} />
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
