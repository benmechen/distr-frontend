import {
	Status as StatusIndicator,
	SystemStatus,
} from '../../../../../../../components/Status';

interface IStatus {
	healthy: number;
	unhealthy: number;
}

const Status = ({ healthy, unhealthy }: IStatus) => (
	<div className="flex items-center py-2">
		<StatusIndicator
			status={
				unhealthy === 0
					? SystemStatus.HEALTHY
					: healthy === 0
					? SystemStatus.OUTAGE
					: SystemStatus.DEGRADED
			}
		/>
		<span className="text-xs ml-2 font-light">
			{healthy} / {healthy + unhealthy} Healthy
		</span>
	</div>
);
export default Status;
