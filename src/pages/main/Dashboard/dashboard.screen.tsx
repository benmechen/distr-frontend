import { CreateSystemCard } from './components/CreateSystemCard';
import { SystemCard } from './components/SystemCard';
import { ISystemCard } from './components/SystemCard/SystemCard';

const DashboardScreen = () => {
	const systems: ISystemCard[] = [
		{
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
		{
			name: 'Hiver',
			status: {
				healthy: 1,
				unhealthy: 1,
			},
			deployments: [
				{
					id: '1234',
					name: 'Dev',
				},
				{
					id: '1234',
					name: 'Staging',
				},
			],
		},
	];

	return (
		<div className="flex flex-wrap items-center justify-center h-screen gap-4">
			<CreateSystemCard />
			{systems.map((system) => (
				<SystemCard {...system} />
			))}
		</div>
	);
};
export default DashboardScreen;
