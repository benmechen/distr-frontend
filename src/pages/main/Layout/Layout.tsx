import {
	Location,
	Outlet,
	useLocation,
	useSearchParams,
} from 'react-router-dom';
import { Emphasis } from '../../../components/Emphasis';

const Layout = () => {
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const title = getTitle(location, searchParams);

	return (
		<main>
			<nav className="w-screen p-4 bg-gray-900 text-white font-medium text-3xl text-center fixed">
				{title[0]} <Emphasis>{title[1]}</Emphasis>
			</nav>
			<Outlet />
		</main>
	);
};

const getTitle = (
	location: Location,
	searchParams: URLSearchParams,
): [string, string] => {
	if (location.pathname.includes('/system/'))
		return [searchParams.get('name') ?? '', 'deployments'];
	return ['Your', 'systems'];
};

export default Layout;
