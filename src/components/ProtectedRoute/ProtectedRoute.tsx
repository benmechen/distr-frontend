import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loading } from '../Loading';

interface IAuthRoute {
    isLoggedIn: boolean | null;
}

const ProtectedRoute = ({ isLoggedIn }: IAuthRoute) => {
    const location = useLocation();

    if (isLoggedIn === null) return <Loading />;
    if (!isLoggedIn) {
 return (
            <Navigate to="/auth/welcome" state={{ from: location }} replace />
        );
}

    return <Outlet />;
};
export default ProtectedRoute;
