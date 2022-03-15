import { Navigate, Outlet } from 'react-router-dom';

interface IAuthRoute {
    isLoggedIn: boolean | null;
}

const AuthRoute = ({ isLoggedIn }: IAuthRoute) => {
    if (isLoggedIn) return <Navigate to="/" replace />;
    return <Outlet />;
};
export default AuthRoute;
