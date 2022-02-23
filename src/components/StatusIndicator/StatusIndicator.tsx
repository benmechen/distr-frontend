import { useEffect, useState } from 'react';
import { Status } from '../../generated/graphql';

interface IStatusIndicator {
	status: Status;
}

const StatusIndicator = ({ status }: IStatusIndicator) => {
	const [colour, setColour] = useState<string>('bg-gray-400');

	useEffect(() => {
		switch (status) {
			case Status.Healthy:
				setColour('bg-lime-400');
				break;
			case Status.Degraded:
				setColour('bg-amber-400');
				break;
			default:
				setColour('bg-rose-400');
		}
	}, [status]);

	return (
		<span className={`w-3 h-3 rounded-full inline-block ${colour}`}></span>
	);
};
export default StatusIndicator;
