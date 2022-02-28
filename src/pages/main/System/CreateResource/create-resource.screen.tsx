import { useState } from 'react';
import { PageIndicator } from './components/PageIndicator';
import SelectServiceScreen from './screens/select-service.screen';
import ServiceDetailsScreen from './screens/service-details.screen';
import ResourceDetailsScreen from './screens/resource-details.screen';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../Layout';

const CreateResourceScreen = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);

	const onPage1 = (id: string) => setPage((page) => page + 1);
	const onPage2 = (resourceId: string) => setPage((page) => page + 1);
	const onPage3 = (systemId: string) => navigate(`/system/${systemId}`);

	return (
		<Layout
			title={{
				main: 'New Resource',
			}}
			onBack={() => navigate(-1)}
		>
			<div className="pt-20 max-h-screen overflow-hidden items-center">
				<PageIndicator page={page} />
				{page === 0 && <SelectServiceScreen next={onPage1} />}
				{page === 1 && <ServiceDetailsScreen next={onPage2} />}
				{page === 2 && <ResourceDetailsScreen next={onPage3} />}
			</div>
		</Layout>
	);
};
export default CreateResourceScreen;
