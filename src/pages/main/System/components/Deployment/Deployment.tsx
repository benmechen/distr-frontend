import { OptionsButton } from '../../../../../components/OptionsButton';
import { StatusHeader } from '../../../../../components/StatusHeader';
import { CreateResourceButton } from './components/CreateResourceButton';
import { IResource, Resource } from './components/Resource';

export interface IDeployment {
	name: string;
	status: {
		healthy: number;
		unhealthy: number;
	};
	resources: IResource[];
}

const Deployment = ({ name, status, resources }: IDeployment) => {
	return (
		<div className="no-scrollbar w-112 pt-4 h-full overflow-y-scroll bg-white rounded-lg shadow-md flex flex-col justify-start items-center gap-6">
			<div className="flex w-full justify-between items-start px-4">
				<StatusHeader {...status} />
				<OptionsButton />
			</div>
			<h2 className="text-2xl font-bold">{name}</h2>
			<div className="w-full">
				{resources.map((resource) => (
					<Resource {...resource} />
				))}
				<CreateResourceButton />
			</div>
		</div>
	);
};
export default Deployment;
