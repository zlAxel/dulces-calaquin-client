
import { Link, Outlet, useLocation } from "react-router-dom"

import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useApp } from "../hooks/useApp";
import { Alert } from "../components/Alert";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Logo } from "../components/utility/Logo";

export const LayoutAuth = () => {

    const location  = useLocation(); // * Extraemos la ubicación actual
    const { check, title, subtitle, setSubtitle } = useAuth(); 
    
    const { alerts, setAlerts } = useApp();

    useEffect(() => {
        check("Auth"); // * Validamos si la sesión es activa
    }, [])

    useEffect(() => {
        setAlerts([]); // * Limpiamos las alertas
        setSubtitle(""); // * Limpiamos el subtítulo
    }, [location])

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-down animate-duration-[800ms]">
                    <Logo className="mx-auto h-16" />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        { title }
                    </h2>
                    { subtitle && (
                        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
                            { subtitle }
                        </p>
                    )}
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 pt-6 shadow sm:rounded-lg sm:px-12 animate-fade-up animate-duration-[800ms]">
                        { location.pathname !== "/auth/punto-venta" && 
                            alerts.length > 0 && (
                                <Alert />
                            )
                        }
                        <Outlet />
                    </div>
                </div>
                {
                    location.pathname === "/auth/register" && (
                        <p className="mt-10 text-center text-sm text-gray-500 animate-fade-up animate-duration-[800ms]">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/auth/login" className="font-semibold leading-6 text-primary-600 hover:text-primary-500">
                                Inicia sesión <ArrowLeftOnRectangleIcon className="inline-block w-4 h-4 -mt-1" />
                            </Link>
                        </p>
                    )
                }
            </div>
        </>
    )
}
