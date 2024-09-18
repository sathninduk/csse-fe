"use client"
import {useEffect} from "react";

export default function AdminDashboard() {
    useEffect(() => {
        window.location.href = "/admin/dashboard/overview";
    }, []);
}