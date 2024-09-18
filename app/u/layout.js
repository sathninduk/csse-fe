"use client"

import DashboardNav from '../components/DashboardNav';
import ProtectedRoute from "@/app/middlewares/authMiddleware";

function ULayout({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}

export default ProtectedRoute(ULayout);