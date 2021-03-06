import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusIndicator } from '../../../../../../../components/StatusIndicator';
import {
    Status,
    Usage as IUsage,
    UsageType,
} from '../../../../../../../generated/graphql';
import { Usage } from './components/Usage';
import { View } from './components/View';

export interface IResource {
    id: string;
    name: string;
    usage?: IUsage | null;
    status: Status;
    deploymentId: string;
}

const Resource = ({ id, name, usage, status, deploymentId }: IResource) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    return (
        <button
            onClick={() => navigate(`${deploymentId}/resource/${id}`)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="w-full p-4 border-t border-gray-100 flex items-center justify-between gap-4"
        >
            <h3 className="text-xl font-light w-1/3 text-left overflow-hidden text-ellipsis">
                {name}
            </h3>
            {usage?.type === UsageType.Limited ? (
                <Usage
                    type="limited"
                    current={usage.current ?? 0}
                    limit={usage.limit ?? 0}
                />
            ) : (
                <Usage type="unlimited" />
            )}
            <StatusIndicator status={status} />
            <View hover={hover} />
        </button>
    );
};

export default Resource;
