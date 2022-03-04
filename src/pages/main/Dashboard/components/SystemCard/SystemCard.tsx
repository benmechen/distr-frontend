import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../../components/Modal';
import { OptionsButton } from '../../../../../components/OptionsButton';
import { Card } from '../Card';
import { Deployment } from './components/Deployment';
import { StatusHeader } from '../../../../../components/StatusHeader';
import { UpdateSystemForm } from './components/UpdateSystemForm';

export interface ISystemCard {
	id: string;
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

const SystemCard = ({ id, name, status, deployments }: ISystemCard) => {
	const navigate = useNavigate();
	const [Modal, { open }] = useModal();

	const goToSystem = () => navigate(`/system/${id}?name=${name}`);

	return (
		<>
			<Modal title={name}>
				<UpdateSystemForm name={name} onSubmit={() => {}} />
			</Modal>
			<Card onClick={goToSystem}>
				<div className="flex w-full justify-between items-start">
					<StatusHeader {...status} />
					<OptionsButton onClick={open} />
				</div>
				<h2 className="text-3xl font-light">{name}</h2>
				<div className="max-w-full overflow-x-scroll flex gap-2 no-scrollbar">
					{deployments.map((deployment, index) => (
						<Deployment
							key={deployment.id}
							index={index}
							{...deployment}
						/>
					))}
				</div>
			</Card>
		</>
	);
};
export default SystemCard;
