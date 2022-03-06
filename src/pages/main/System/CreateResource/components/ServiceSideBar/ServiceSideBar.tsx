import {
	Platform,
	useGetServiceQuery,
} from '../../../../../../generated/graphql';
import { VerifiedBadge } from './components/VerifiedBadge';

interface IServiceSideBar {
	id: string;
	children?: React.ReactNode;
}
const ServiceSideBar = ({ id, children }: IServiceSideBar) => {
	const [{ data }] = useGetServiceQuery({
		variables: {
			id,
		},
	});

	if (!data?.service) return <></>;
	return (
		<div className="w-full md:w-1/3 bg-white shadow-lg h-screen p-4">
			<h2 className="font-bold text-2xl">{data.service.name}</h2>
			{data.service.verified && <VerifiedBadge />}
			<p className="mt-6 font-light leading-6">{data.service.summary}</p>
			<p className="mt-4 mb-6 font-light leading-6">
				{data.service.description}
			</p>
			<hr />
			<p className="mt-6 font-light">
				<span className="font-semibold">Platform:</span>
				<span className="ml-2 underline">{data.service.platform}</span>
			</p>
			<p className="font-light">
				<span className="font-semibold">Author:</span>
				<span className="ml-2 underline">
					{data.service.author.name}
				</span>
			</p>
			<p className="font-light">
				<span className="font-semibold">Source Code:</span>
				<span className="ml-2 underline">
					{data.service.sourceCodeURL}
				</span>
			</p>
			<p className="font-light">
				<span className="font-semibold">Docs:</span>
				<span className="ml-2 underline">
					{data.service.documentationURL}
				</span>
			</p>
			{children}
		</div>
	);
};
export default ServiceSideBar;
