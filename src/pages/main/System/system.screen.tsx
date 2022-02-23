import { Status } from '../../../generated/graphql';
import { CreateDeploymentButton } from './components/CreateDeploymentButton';
import { Deployment, IDeployment } from './components/Deployment';

const SystemScreen = () => {
	const deployments: IDeployment[] = [
		{
			name: 'Staging',
			status: {
				healthy: 3,
				unhealthy: 2,
			},
			resources: [
				{
					id: '123',
					name: 'Storage',
					usage: {
						type: 'limited',
						current: 500,
						limit: 1000,
					},
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'Compute',
					usage: {
						type: 'limited',
						current: 800,
						limit: 1000,
					},
					status: Status.Degraded,
				},
				{
					id: '123',
					name: 'Email',
					usage: {
						type: 'limited',
						current: 1500,
						limit: 10000,
					},
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'SMS',
					usage: { type: 'unlimited' },
					status: Status.Down,
				},
				{
					id: '123',
					name: 'DNS',
					usage: { type: 'unlimited' },
					status: Status.Healthy,
				},
			],
		},
		{
			name: 'Production',
			status: {
				healthy: 5,
				unhealthy: 0,
			},
			resources: [
				{
					id: '123',
					name: 'Storage',
					usage: {
						type: 'limited',
						current: 500,
						limit: 1000,
					},
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'Compute',
					usage: {
						type: 'limited',
						current: 800,
						limit: 1000,
					},
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'Email',
					usage: {
						type: 'limited',
						current: 1500,
						limit: 10000,
					},
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'SMS',
					usage: { type: 'unlimited' },
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'DNS',
					usage: { type: 'unlimited' },
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'Firewall',
					usage: { type: 'unlimited' },
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'Firewall',
					usage: { type: 'unlimited' },
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'Firewall',
					usage: { type: 'unlimited' },
					status: Status.Healthy,
				},
				{
					id: '123',
					name: 'Firewall',
					usage: { type: 'unlimited' },
					status: Status.Healthy,
				},
			],
		},
	];

	return (
		<div className="w-screen h-screen p-14 pb-28 pt-40 flex items-center justify-center gap-14">
			<CreateDeploymentButton />
			{deployments.map((deployment) => (
				<Deployment {...deployment} />
			))}
		</div>
	);
};
export default SystemScreen;
