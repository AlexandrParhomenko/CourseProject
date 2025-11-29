import {Navigate, useLocation} from "react-router-dom";
import {useUserStore} from "@/store/store.ts";
import routes from "@/router/routes.ts";
import {type ReactNode, useEffect} from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {user} = useUserStore();
    const location = useLocation();
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");

    useEffect(() => {
        // Если нет токена или пользователя, очищаем store
        if (!token && user) {
            useUserStore.getState().clearUser();
        }
    }, [token, user]);

    if (!token || !user) {
        // Сохраняем путь, куда пользователь пытался попасть, для редиректа после входа
        return <Navigate to={routes.auth} state={{from: location}} replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

