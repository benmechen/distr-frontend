import { useState } from 'react';
import { Button } from '../../../../../components/Button';
import { Input } from '../../../../../components/Input';
import { Platform } from '../../components/Deployment/components/DeploymentForm/DeploymentForm';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceSideBar } from '../components/ServiceSideBar';

interface ISelectServiceScreen {
	next: (id: string) => void;
}
const SelectServiceScreen = ({ next }: ISelectServiceScreen) => {
	const [selectedService, setSelectedService] = useState<string>();

	const handleServiceClick = (id: string) => setSelectedService(id);

	return (
		<div className="flex justify-end">
			<div className="w-full p-4 flex flex-col items-start max-h-full">
				<div className="w-3/4 max-h-full">
					<h2 className="text-2xl">Select a service</h2>
					<p className="mt-4 font-light">
						Select a service from the marketplace below.
					</p>
					<p className="font-light">
						Services let you control cloud resources.
					</p>
					<Input className="mt-4" placeholder="Search for services" />
					<div className="flex justify-between flex-wrap gap-4 mt-6 pr-4 pb-4 max-h-full overflow-scroll no-scrollbar">
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
				<ServiceSideBar id="1234">
					<Button
						onClick={() => selectedService && next(selectedService)}
						className="w-full mt-12"
					>
						Select
					</Button>
				</ServiceSideBar>
			) : (
				<div className="w-full md:w-1/3"></div>
			)}
		</div>
	);
};
export default SelectServiceScreen;
