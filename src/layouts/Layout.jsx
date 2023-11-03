
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { useState, useEffect } from 'react';
import { SideMenu } from "../components/layout/SideMenu";
import { Gradients } from "../components/layout/Gradients";
import { Navbar } from "../components/layout/Navbar";
import { Toaster } from "sonner";
import { Cart } from "../components/layout/Cart";


export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar el menú lateral
    const [cartOpen, setCartOpen]       = useState(false); // Estado para controlar el carrito

    const { check } = useAuth(); // * Extraemos el estado de autenticación y la función para validar la sesión

        useEffect(() => {
            check(); // * Validamos si la sesión es activa
        }, []);

    return (
        <>
            <div className="relative isolate">
                {/* // TODO | Sombras gradientes */}
                <Gradients />
                {/* // TODO | Menú lateral */}
                <SideMenu 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <Cart
                    cartOpen={cartOpen}
                    setCartOpen={setCartOpen}
                />

                {/* // ? Borders */}
                <div className="h-3 lg:h-full lg:w-8 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:overflow-y-auto bg-gray-900 lg:pb-4" />
                <div className="h-3 lg:h-full lg:w-8 lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:block lg:overflow-y-auto bg-gray-900 lg:pb-4" />

                <div className="lg:px-8">
                    {/* // TODO | Menú superior */}
                    <Navbar
                        setSidebarOpen={setSidebarOpen}
                        setCartOpen={setCartOpen}
                    />

                    {/* // TODO | Contenido principal */}
                    <main className="animate-fade-down animate-once">
                        <div className="mx-auto max-w-7xl mt-16 px-4 pb-12 sm:px-6 lg:px-8">
                            <div className="rounded-lg bg-white px-5 py-6 shadow-lg sm:px-6">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>
                {/* // TODO | Toasts */}
                <Toaster
                    expand={true}
                    position="top-right" 
                    toastOptions={{
                        className: 'w-96',
                    }}
                />
            </div>
        </>
    )
}

