import { useModal } from '../../../../../components/Modal';
import { OptionsButton } from '../../../../../components/OptionsButton';
import { Card } from '../Card';
import { Deployment } from './components/Deployment';
import { Status } from './components/Status';
import { UpdateSystemForm } from './components/UpdateSystemForm';

export interface ISystemCard {
	name: string;
	status: {
		healthy: number;
		unhealthy: number;
	};
	deployments: {
		id: string;
		name: string;
	}[];
}

const SystemCard = ({ name, status, deployments }: ISystemCard) => {
	const [Modal, { open }] = useModal();

	return (
		<>
			<Modal title={name}>
				<UpdateSystemForm name={name} onSubmit={() => {}} />
			</Modal>
			<Card>
				<div className="flex w-full justify-between items-start">
					<Status {...status} />
					<OptionsButton onClick={open} />
				</div>
				<h2 className="text-3xl font-light">{name}</h2>
				<div className="max-w-full overflow-x-scroll flex gap-2 no-scrollbar">
					{deployments.map((deployment, index) => (
						<Deployment index={index} {...deployment} />
					))}
				</div>
			</Card>
		</>
	);
};
export default SystemCard;
