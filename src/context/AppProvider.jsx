
import { toast } from "sonner";
import { Notification } from "../components/Notification";

import { createContext, useEffect, useState } from "react";
import { getProducts } from "../data/products";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [toggleProductsModal, setToggleProductsModal] = useState(false);  // * Estado para mostrar/ocultar el modal de productos
    const [products, setProducts] = useState([]);                           // * Estado para almacenar los productos
    
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('user')) || {} ); // * Estado para almacenar el usuario
    const [cart, setCart] = useState( JSON.parse(localStorage.getItem('cart')) || [] ); // * Estado para almacenar el carrito

    useEffect(() => {
        // ? Obtenemos los productos de la API
        getProducts().then( data => setProducts( data ) );
    }, []);

    useEffect(() => {
        // ? Almacenamos el carrito en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    useEffect(() => {
        // ? Almacenamos al usuario en el localStorage
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])


    // ? Creamos función para modificar las piezas de un producto
    const handleProductAmount = (id, amount) => {
        const newCart = cart.map( product => {
            if (product.id == id) {
                product.amount = amount;
            }
            return product;
        });
        setCart( newCart );
    };

    // ? Creamos función para eliminar un producto del carrito
    const handleDeleteProduct = (id) => {
        const newCart = cart.filter( product => product.id != id );
        setCart( newCart );
    };
    
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
            toggleProductsModal, setToggleProductsModal,
            cart, setCart,
            products,
            handleNotification, handleProductAmount, handleDeleteProduct
            }}>
            { children }
        </AppContext.Provider>
    )
};
