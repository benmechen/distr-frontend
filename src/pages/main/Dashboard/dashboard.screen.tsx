import { CreateSystemCard } from './components/CreateSystemCard';
import { SystemCard } from './components/SystemCard';
import { ISystemCard } from './components/SystemCard/SystemCard';

const DashboardScreen = () => {
	const systems: ISystemCard[] = [
		{
			id: '1',
			name: 'Uplevyl',
			status: {
				healthy: 0,
				unhealthy: 2,
			},
			deployments: [
				{
					id: '1234',
					name: 'Staging',
				},
				{
					id: '1234',
					name: 'Production',
				},
				{
					id: '1234',
					name: 'Production',
				},
				{
					id: '1234',
					name: 'Production',
				},
			],
		},
		{
			id: '2',
			name: 'Limelight',
			status: {
				healthy: 2,
				unhealthy: 0,
			},
			deployments: [
				{
					id: '1234',
					name: 'Staging',
				},
				{
					id: '1234',
					name: 'Test',
				},
			],
		},
	];

	return (
		<>
			<div className="flex flex-wrap items-center justify-center h-screen gap-4">
				<CreateSystemCard />
				{systems.map((system) => (
					<SystemCard {...system} />
				))}
			</div>
		</>
	);
};
export default DashboardScreen;
