import React from 'react';
import { Loading } from '../Loading';

interface ILoadingWrapper {
    loading: boolean;
    children: React.ReactNode;
}

const LoadingWrapper = ({ loading, children }: ILoadingWrapper) => {
    if (!loading) return <>{children}</>;

    return (
        <div className="w-full h-full py-6 flex items-center justify-center">
            <Loading />
        </div>
    );
};
export default LoadingWrapper;
