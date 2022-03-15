import { Storefront } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

interface IMarketplace {
    className?: string;
}
const Marketplace = ({ className }: IMarketplace) => {
    const navigate = useNavigate();

    return (
        <button className={className} onClick={() => navigate('/marketplace')}>
            <Storefront size={30} />
        </button>
    );
};

export default Marketplace;
