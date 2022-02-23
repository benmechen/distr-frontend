import {
	Location,
	NavigateFunction,
	Outlet,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { Emphasis } from '../../../components/Emphasis';
import { Back } from './components/Back';
import { Settings } from './components/Settings';

const Layout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const title = getTitle(location, searchParams);
	const goBack = getBack(location, navigate);

	return (
		<main>
			<nav className="w-screen p-4 bg-gray-900 text-white fixed flex items-center justify-between">
				{goBack ? <Back onBack={goBack} /> : <div></div>}
				<span className="font-medium text-3xl text-center">
					{title[0]} <Emphasis>{title[1]}</Emphasis>
				</span>
				<Settings />
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

const getBack = (location: Location, navigate: NavigateFunction) => {
	if (location.pathname.includes('/system/')) return () => navigate('/');
	return null;
};

export default Layout;
