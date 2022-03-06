import { useCallback, useState } from 'react';
import Modal, { IModal } from './Modal';

const useModal = (): [
	(props: Omit<IModal, 'open' | 'close'>) => JSX.Element,
	{
		open: () => void;
		close: () => void;
		isOpen: boolean;
		setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	},
] => {
	const [isOpen, setOpen] = useState(false);

	const open = useCallback(() => {
		setOpen(true);
	}, []);

	const close = useCallback(() => {
		setOpen(false);
	}, []);

	const ModalComponent = (props: Omit<IModal, 'open' | 'close'>) => (
		<Modal {...props} open={isOpen} close={close} />
	);

	return [ModalComponent, { open, close, isOpen, setOpen }];
};
export { useModal, Modal };
