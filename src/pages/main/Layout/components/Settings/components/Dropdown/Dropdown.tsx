import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, Buildings, SignOut } from 'phosphor-react';
import { gray } from 'tailwindcss/colors';
import { useGetMeQuery } from '../../../../../../../generated/graphql';
import { useMainContext } from '../../../../../../../main.provider';

const Dropdown = () => {
	const [{ data }] = useGetMeQuery();
	const { clientService } = useMainContext();

	const logout = () => {
		clientService?.logout();
	};

	return (
		<div className="fixed top-20 right-0 shadow-lg bg-white rounded-bl-lg z-0 list-none text-black flex flex-col">
			{data && (
				<div className="flex p-4">
					<img
						src="https://picsum.photos/200"
						className="rounded-full w-12 h-12 mr-2"
					/>
					<div>
						<p>{data.me.name}</p>
						<p className="font-light">
							{data.me.organisation.name}
						</p>
					</div>
				</div>
			)}
			<Link
				to="/settings/account"
				className="border-t border-gray-100 p-4 text-left flex items-center hover:bg-gray-50"
			>
				<UserCircle size={20} color={gray[900]} className="mr-2" />{' '}
				Account Settings
			</Link>
			<Link
				to="/settings/organisation"
				className="border-t border-gray-100 p-4 text-left flex items-center hover:bg-gray-50"
			>
				<Buildings size={20} color={gray[900]} className="mr-2" />{' '}
				Organisation Settings
			</Link>
			<button
				className="border-t border-gray-100 p-4 text-left flex items-center hover:bg-gray-50"
				onClick={logout}
			>
				<SignOut size={20} color={gray[900]} className="mr-2" /> Log Out
			</button>
		</div>
	);
};
export default Dropdown;
