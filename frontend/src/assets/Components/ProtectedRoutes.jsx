import { Navigate, useLocation, Outlet } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext.jsx";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center bg-black text-white">Memuat...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return <Outlet />;
}