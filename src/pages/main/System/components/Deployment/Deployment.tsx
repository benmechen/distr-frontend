import { useModal } from '../../../../../components/Modal';
import { OptionsButton } from '../../../../../components/OptionsButton';
import { StatusHeader } from '../../../../../components/StatusHeader';
import { ResourceRowFragment } from '../../../../../generated/graphql';
import { CreateResourceButton } from './components/CreateResourceButton';
import { DeploymentForm } from './components/DeploymentForm';
import { Resource } from './components/Resource';

export interface IDeployment {
	id: string;
	name: string;
	status: {
		healthy: number;
		unhealthy: number;
	};
	resources: ResourceRowFragment[];
}

const Deployment = ({ id, name, status, resources }: IDeployment) => {
	const [Modal, { open }] = useModal();

	return (
		<>
			<Modal title={name}>
				<DeploymentForm type="update" name={name} onSubmit={() => {}} />
			</Modal>
			<div className="no-scrollbar w-112 pt-4 h-full overflow-y-scroll bg-white rounded-lg shadow-md flex flex-col justify-start items-center gap-6">
				<div className="flex w-full justify-between items-start px-4">
					<StatusHeader {...status} />
					<OptionsButton onClick={open} />
				</div>
				<h2 className="text-2xl font-bold">{name}</h2>
				<div className="w-full">
					{resources.map((resource) => (
						<Resource
							key={resource.id}
							deploymentId={id}
							{...resource}
						/>
					))}
					<CreateResourceButton deploymentId={id} />
				</div>
			</div>
		</>
	);
};
export default Deployment;
