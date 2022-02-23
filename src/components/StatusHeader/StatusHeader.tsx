import { Status } from '../../generated/graphql';
import { StatusIndicator } from '../StatusIndicator';

interface IStatus {
	healthy: number;
	unhealthy: number;
}

const StatusHeader = ({ healthy, unhealthy }: IStatus) => (
	<div className="flex items-center py-2">
		<StatusIndicator
			status={
				unhealthy === 0
					? Status.Healthy
					: healthy === 0
					? Status.Down
					: Status.Degraded
			}
		/>
		<span className="text-xs ml-2 font-light">
			{healthy} / {healthy + unhealthy} Healthy
		</span>
	</div>
);
export default StatusHeader;
