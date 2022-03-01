import { Close } from './components/Close';

export interface IModal {
	title: string;
	children: React.ReactNode;
	open: boolean;
	close: () => void;
}
const Modal = ({ title, children, open: isOpen, close }: IModal) => {
	if (!isOpen) return null;

	return (
		<div className="top-0 left-0 w-screen h-screen z-10 fixed flex items-center justify-center">
			<div className="w-2/5 bg-white shadow-lg rounded-lg fixed z-20">
				<div className="p-4 shadow flex items-center justify-between">
					<h2 className="text-xl font-medium">{title}</h2>
					<Close onClick={close} />
				</div>
				<div className="p-4">{children}</div>
			</div>
			<div
				className="w-screen h-screen bg-black opacity-10"
				onClick={close}
			></div>
		</div>
	);
};
export default Modal;
