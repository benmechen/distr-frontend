import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PageIndicator } from './components/PageIndicator';
import SelectServiceScreen from './screens/select-service.screen';
import ServiceDetailsScreen from './screens/service-details.screen';
import ResourceDetailsScreen from './screens/resource-details.screen';
import { Layout } from '../../Layout';
import { Property, ServiceRowFragment } from '../../../../generated/graphql';

const CreateResourceScreen = () => {
    const navigate = useNavigate();
    const { systemId, deploymentId } = useParams();
    const [page, setPage] = useState(0);
    const [selectedService, setSelectedService] =
        useState<ServiceRowFragment>();
    const [createdResourceId, setCreatedResourceId] = useState<string>();
    const [createdResourceDetails, setCreatedResourceDetails] =
        useState<Property[]>();

    const onPage1 = (service: ServiceRowFragment) => {
        setSelectedService(service);
        setPage((p) => p + 1);
    };
    const onPage2 = (resourceId: string, details: Property[]) => {
        setCreatedResourceId(resourceId);
        setCreatedResourceDetails(details);
        setPage((p) => p + 1);
    };
    const onPage3 = () => navigate(`/system/${systemId}`);

    if (!deploymentId) return <Navigate to="/" />;
    return (
        <Layout
            title={{
                main: 'New Resource',
            }}
            onBack={() => navigate(-1)}
        >
            <div className="pt-4 max-h-screen overflow-y-auto items-center">
                <PageIndicator page={page} />
                {page === 0 && <SelectServiceScreen next={onPage1} />}
                {page === 1 && selectedService && (
                    <ServiceDetailsScreen
                        service={selectedService}
                        deploymentId={deploymentId}
                        next={onPage2}
                    />
                )}
                {page === 2 && createdResourceId && createdResourceDetails && (
                    <ResourceDetailsScreen
                        id={createdResourceId}
                        details={createdResourceDetails}
                        next={onPage3}
                    />
                )}
            </div>
        </Layout>
    );
};
export default CreateResourceScreen;
