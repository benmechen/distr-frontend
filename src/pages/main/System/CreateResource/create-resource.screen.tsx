import { useState } from 'react';
import { PageIndicator } from './components/PageIndicator';
import SelectServiceScreen from './screens/select-service.screen';
import ServiceDetailsScreen from './screens/service-details.screen';

const CreateResourceScreen = () => {
	const [page, setPage] = useState(0);

	const onPage1 = (id: string) => setPage((page) => page + 1);

	return (
		<div className="pt-20 max-h-screen overflow-hidden items-center">
			<PageIndicator page={page} />
			{page === 0 && <SelectServiceScreen next={onPage1} />}
			{page === 1 && <ServiceDetailsScreen next={onPage1} />}
		</div>
	);
};
export default CreateResourceScreen;
