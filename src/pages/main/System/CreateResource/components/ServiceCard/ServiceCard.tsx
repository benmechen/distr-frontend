import { Platform } from '../../../../../../generated/graphql';
import { Card } from '../../../../Dashboard/components/Card';
import { VerifiedBadge } from '../ServiceSideBar/components/VerifiedBadge';

interface IServiceCard {
    name: string;
    platform: Platform;
    verified?: boolean;
    selected?: boolean;
    summary: string;
    onClick?: () => void;
}
const ServiceCard = ({
    name,
    platform,
    selected,
    verified,
    summary,
    onClick,
}: IServiceCard) => (
    <Card
        justify="between"
        disableHover
        className="px-0 py-0"
        onClick={onClick}
    >
        <div className="w-full flex items-center justify-between">
            <span
                className={`lowercase ${
                    platform === Platform.Aws
                        ? 'bg-gray-800 text-orange-600'
                        : platform === Platform.Azure
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-white'
                } px-1 rounded-br-md`}
            >
                {platform}
            </span>
            {selected && (
                <span className="w-2 h-2 mr-2 bg-indigo-500 rounded-full" />
            )}
        </div>
        <h3 className="text-3xl mt-4 px-4 text-center font-bold flex gap-1">
            {name}
            {verified && <VerifiedBadge full={false} />}
        </h3>
        <p className="font-thin p-4 text-center text-lg">{summary}</p>
    </Card>
);
export default ServiceCard;
