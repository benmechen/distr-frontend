import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Layout } from '../Layout';
import { Platform } from '../System/components/Deployment/components/DeploymentForm/DeploymentForm';
import { ServiceCard } from '../System/CreateResource/components/ServiceCard';
import { ServiceSideBar } from '../System/CreateResource/components/ServiceSideBar';
import { CreateServiceCard } from './components/CreateServiceCard';

const MarketplaceScreen = () => {
	const navigate = useNavigate();
	const [selectedService, setSelectedService] = useState<string>();

	const handleServiceClick = (id: string) => {
		if (id === selectedService) setSelectedService(undefined);
		else setSelectedService(id);
	};

	return (
		<Layout
			onBack={() => navigate(-1)}
			title={{
				main: 'Marketplace',
			}}
		>
			<div className="flex justify-end">
				<div className="w-full p-4 flex flex-col items-start max-h-full">
					<div className="w-3/4 max-h-full">
						<Input
							className="mt-4"
							placeholder="Search for services"
						/>
						<div className="flex justify-between flex-wrap gap-4 mt-6 pr-4 pb-4 max-h-full overflow-scroll no-scrollbar">
							<CreateServiceCard />
							<ServiceCard
								id="1"
								name="S3"
								platform={Platform.AWS}
								summary="Simple Storage Service"
								selected={selectedService === '1'}
								onClick={handleServiceClick}
							/>
							<ServiceCard
								id="2"
								name="Blob Storage"
								platform={Platform.AZURE}
								summary="Store large amounts of unstructured data"
								selected={selectedService === '2'}
								onClick={handleServiceClick}
							/>
							<ServiceCard
								id="3"
								name="Big Query"
								platform={Platform.GCP}
								summary="Scalable datawarehouse"
								selected={selectedService === '3'}
								onClick={handleServiceClick}
							/>
							<ServiceCard
								id="4"
								name="Digital OceanDroplet"
								platform={Platform.OTHER}
								summary="Affordable servers"
								selected={selectedService === '4'}
								onClick={handleServiceClick}
							/>
							<ServiceCard
								id="5"
								name="Service Name"
								platform={Platform.OTHER}
								summary="Short description"
								selected={selectedService === '5'}
								onClick={handleServiceClick}
							/>
							<ServiceCard
								id="6"
								name="Service Name"
								platform={Platform.OTHER}
								summary="Short description"
								selected={selectedService === '6'}
								onClick={handleServiceClick}
							/>
							<ServiceCard
								id="7"
								name="Service Name"
								platform={Platform.OTHER}
								summary="Short description"
								selected={selectedService === '7'}
								onClick={handleServiceClick}
							/>
							<ServiceCard
								id="8"
								name="Service Name"
								platform={Platform.OTHER}
								summary="Short description"
								selected={selectedService === '8'}
								onClick={handleServiceClick}
							/>
						</div>
					</div>
				</div>
				{selectedService ? (
					<ServiceSideBar id="1234" />
				) : (
					<div className="w-full md:w-1/3"></div>
				)}
			</div>
		</Layout>
	);
};
export default MarketplaceScreen;
