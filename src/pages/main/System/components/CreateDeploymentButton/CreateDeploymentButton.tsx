import { Plus } from 'phosphor-react';

const CreateDeploymentButton = () => (
	<button
		className="rounded-l-full w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 fixed p-5 flex transition-transform duration-150 hover:-translate-x-1"
		style={{
			right: '-2rem',
			top: '50%',
		}}
	>
		<Plus color="white" width="100%" className="-translate-x-3" />
	</button>
);
export default CreateDeploymentButton;
