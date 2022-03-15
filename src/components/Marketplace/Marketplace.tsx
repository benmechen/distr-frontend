import { useEffect, useState } from 'react';
import {
    ServiceRowFragment,
    useSearchServicesQuery,
} from '../../generated/graphql';
import { CreateServiceCard } from '../../pages/main/Marketplace/components/CreateServiceCard';
import { ServiceCard } from '../../pages/main/System/CreateResource/components/ServiceCard';
import { getNodesFromEdges } from '../../utils/helper.service';
import { Input } from '../Input';
import { LoadingWrapper } from '../LoadingWrapper';

interface IMarketplace {
    selectedService?: ServiceRowFragment;
    setSelectedService: React.Dispatch<
        React.SetStateAction<ServiceRowFragment | undefined>
    >;
    showCreate?: boolean;
}
const Marketplace = ({
    selectedService,
    setSelectedService,
    showCreate,
}: IMarketplace) => {
    const [query, setQuery] = useState<string>();
    const [services, setServices] = useState<ServiceRowFragment[]>();

    const [{ data, fetching }] = useSearchServicesQuery({
        variables: {
            query,
            limit: 100,
        },
    });

    useEffect(() => {
        if (!data?.services.edges) return;

        const nodes = getNodesFromEdges(data.services.edges);
        setServices(nodes);
    }, [data]);

    const handleServiceClick = (service: ServiceRowFragment) => {
        if (service.id === selectedService?.id) setSelectedService(undefined);
        else setSelectedService(service);
    };

    return (
        <>
            <Input
                className="mt-4"
                placeholder="Search for services"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex justify-start flex-wrap gap-4 mt-6 pr-4 pb-4 max-h-full overflow-scroll no-scrollbar">
                {showCreate && <CreateServiceCard />}
                <LoadingWrapper loading={fetching}>
                    {services?.map((service) => (
                        <ServiceCard
                            {...service}
                            key={service.id}
                            selected={selectedService?.id === service.id}
                            onClick={() => handleServiceClick(service)}
                        />
                    ))}
                </LoadingWrapper>
            </div>
        </>
    );
};
export default Marketplace;
