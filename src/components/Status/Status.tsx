export enum SystemStatus {
	HEALTHY,
	DEGRADED,
	OUTAGE,
}

interface IStatus {
	status: SystemStatus;
}
const Status = ({ status }: IStatus) => {
	let colour: string;
	switch (status) {
		case SystemStatus.HEALTHY:
			colour = 'lime';
			break;
		case SystemStatus.DEGRADED:
			colour = 'amber';
			break;
		default:
			colour = 'rose';
	}

	return (
		<span
			className={`w-3 h-3 rounded-full bg-${colour}-400 inline-block`}
		></span>
	);
};
export default Status;
