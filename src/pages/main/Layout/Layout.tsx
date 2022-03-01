import { Emphasis } from '../../../components/Emphasis';
import { Back } from './components/Back';
import { Marketplace } from './components/Marketplace';
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
			<div>
				<Marketplace className="mr-4" />
				<Settings />
			</div>
		</nav>
		<div className="pt-16">{children}</div>
	</main>
);
export default Layout;
