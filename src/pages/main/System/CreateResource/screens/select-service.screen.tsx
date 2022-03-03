import { useState } from 'react';
import { Button } from '../../../../../components/Button';
import { Marketplace } from '../../../../../components/Marketplace';
import { ServiceSideBar } from '../components/ServiceSideBar';

interface ISelectServiceScreen {
	next: (id: string) => void;
}
const SelectServiceScreen = ({ next }: ISelectServiceScreen) => {
	const [selectedService, setSelectedService] = useState<string>();

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
					<Marketplace
						selectedService={selectedService}
						setSelectedService={setSelectedService}
					/>
				</div>
			</div>
			{selectedService ? (
				<ServiceSideBar id={selectedService}>
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
