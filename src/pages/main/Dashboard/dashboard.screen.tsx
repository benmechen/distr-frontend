import { useEffect, useState } from 'react';
import {
    SystemRowFragment,
    useGetSystemsQuery,
} from '../../../generated/graphql';
import { getNodesFromEdges } from '../../../utils/helper.service';
import { Layout } from '../Layout';
import { CreateSystemCard } from './components/CreateSystemCard';
import { SystemCard } from './components/SystemCard';

const DashboardScreen = () => {
    const [systems, setSystems] = useState<SystemRowFragment[]>([]);
    const [{ data, fetching }] = useGetSystemsQuery({
        variables: {
            limit: 25,
        },
    });

    useEffect(() => {
        if (!data?.systems.edges) return;
        const nodes = getNodesFromEdges(data?.systems.edges);

        setSystems(nodes);
    }, [data]);

    return (
        <Layout
            loading={fetching}
            title={{
                main: 'Your',
                emphasis: 'Systems',
            }}
        >
            <div className="flex flex-wrap items-center justify-center h-screen gap-4 -mt-16">
                <CreateSystemCard />
                {systems.map((system) => (
                    <SystemCard key={system.id} {...system} />
                ))}
            </div>
        </Layout>
    );
};
export default DashboardScreen;
