import { useState, useEffect } from 'react';
import LoadingScreen from "@/app/components/LoadingScreen";

const ProtectedRoute = (WrappedComponent) => {
    return function AuthenticatedRoute(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
            } else {
                setIsAuthenticated(true);
            }
        }, [props]);

        if (!isAuthenticated) {
            return <LoadingScreen />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default ProtectedRoute;