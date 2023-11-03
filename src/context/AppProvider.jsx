
import { toast } from "sonner";
import { Notification } from "../components/Notification";

import { createContext, useEffect, useState } from "react";
import { getProducts } from "../data/products";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [user, setUser] = useState({});                    // * Estado para almacenar los datos del usuario
    const [products, setProducts] = useState([]);            // * Estado para almacenar los productos
    const [cart, setCart] = useState([]);                    // * Estado para almacenar los productos del carrito

    // ? Obtenemos los productos de la API
    useEffect(() => {
        getProducts().then( data => setProducts( data ) );
    }, []);
    
    // ? Creamos función para mostrar notificaciones
    const handleNotification = (title, message, type, time) => {
        toast.custom((toastAction) => (
            <Notification
                title={title}
                message={message}
                type={type}
                toastAction={toastAction}
            />
        ), {
            duration: time,
        });
    };

    return (
        <AppContext.Provider value={{
            user, setUser,
            alerts, setAlerts,
            toggleModal, setToggleModal,
            cart, setCart,
            products,
            handleNotification,
            }}>
            { children }
        </AppContext.Provider>
    )
};
