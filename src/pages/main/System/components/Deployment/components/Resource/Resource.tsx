import { useState } from 'react';
import { StatusIndicator } from '../../../../../../../components/StatusIndicator';
import { Status } from '../../../../../../../generated/graphql';
import { IUsage, Usage } from './components/Usage';
import { View } from './components/View';

export interface IResource {
	id: string;
	name: string;
	usage: IUsage;
	status: Status;
}

const Resource = ({ name, usage, status }: IResource) => {
	const [hover, setHover] = useState(false);
	return (
		<button
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="w-full p-4 border-t border-gray-100 flex items-center justify-between gap-4"
		>
			<h3 className="text-xl font-light w-1/3 text-left overflow-hidden text-ellipsis">
				{name}
			</h3>
			<Usage {...usage} />
			<StatusIndicator status={status} />
			<View hover={hover} />
		</button>
	);
};

export default Resource;
