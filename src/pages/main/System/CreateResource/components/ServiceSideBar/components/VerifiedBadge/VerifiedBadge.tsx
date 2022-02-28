import { CircleWavyCheck } from 'phosphor-react';
import { Emphasis } from '../../../../../../../../components/Emphasis';

interface IVerifiedBadge {
	full?: boolean;
}
const VerifiedBadge = ({ full = true }: IVerifiedBadge) => (
	<span className="flex items-center text-indigo-500">
		<CircleWavyCheck size="1rem" className="mr-1" />
		{full && <Emphasis bold={false}>Verified</Emphasis>}
	</span>
);
export default VerifiedBadge;
