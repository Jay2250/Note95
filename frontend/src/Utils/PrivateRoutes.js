import { Navigate, Outlet } from "react-router-dom";
import Auth from "./Auth";

const PrivateRoutes = () => {
    return (
        Auth.checkAuth() ? <Outlet /> : <Navigate to={'/login'} />
    )
}

export default PrivateRoutes;