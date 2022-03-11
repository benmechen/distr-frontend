import { GearSix } from 'phosphor-react';
import { useState } from 'react';
import { Dropdown } from './components/Dropdown';

const Settings = () => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<button>
				<GearSix size={30} onClick={() => setOpen((open) => !open)} />
			</button>
			{open && <Dropdown />}
		</>
	);
};

export default Settings;
