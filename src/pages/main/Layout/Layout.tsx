import { Emphasis } from '../../../components/Emphasis';
import { Back } from './components/Back';
import { Settings } from './components/Settings';

interface ILayout {
	title: {
		main: string;
		emphasis?: string;
	};
	onBack?: () => void;
	children: React.ReactNode;
}
const Layout = ({ title, onBack, children }: ILayout) => (
	<main>
		<nav className="w-screen p-4 bg-gray-900 text-white fixed flex items-center justify-between">
			{onBack ? <Back onBack={onBack} /> : <div></div>}
			<span className="font-medium text-3xl text-center">
				{title.main}{' '}
				{title.emphasis && <Emphasis>{title.emphasis}</Emphasis>}
			</span>
			<Settings />
		</nav>
		{children}
	</main>
);
export default Layout;
