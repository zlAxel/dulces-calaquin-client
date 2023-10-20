
import { Outlet, useLocation } from "react-router-dom"

import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useApp } from "../hooks/useApp";

export const LayoutAuth = () => {

    const location = useLocation(); // * Extraemos la ubicación actual

    const { check } = useAuth(); 
    const { setAlerts } = useApp();

    useEffect(() => {
        check("Auth"); // * Validamos si la sesión es activa
    }, [])

    useEffect(() => {
        setAlerts([]); // * Limpiamos las alertas
    }, [location])

    return (
        <div>
            <Outlet />
        </div>
    )
}
