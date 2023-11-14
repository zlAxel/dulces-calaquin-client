
import { toast } from "sonner";
import { Notification } from "../components/Notification";

import { createContext, useEffect, useState } from "react";
import { getProducts } from "../data/products";
import { storePurchase } from "../data/purchases";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [toggleProductsModal, setToggleProductsModal] = useState(false);  // * Estado para mostrar/ocultar el modal de productos
    const [products, setProducts] = useState([]);                           // * Estado para almacenar los productos
    
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('user')) || {} ); // * Estado para almacenar el usuario
    const [cart, setCart] = useState( JSON.parse(localStorage.getItem('cart')) || [] ); // * Estado para almacenar el carrito

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        // ? Almacenamos el carrito en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    useEffect(() => {
        // ? Almacenamos al usuario en el localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // ? Obtenemos los productos de la API si el usuario existe
        if ( Object.keys(user).length > 0 ) {
            getProducts().then( data => setProducts( data ) );
        }
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

    // ? Creamos función para crear la compra del usuario
    const handleCreatePurchase = ( status, cart ) => {
        // ? Creamos un arreglo de los productos, dejando solo el id y la cantidad
        const products = cart.map( product => ({ id: product.id, amount: product.amount }) );

        // ? Llamamos a la API para crear la compra
        const response = storePurchase(status, products).then( data => {
            return data;
        });

        return response;
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
            handleNotification, handleProductAmount, handleDeleteProduct, handleCreatePurchase, 
            }}>
            { children }
        </AppContext.Provider>
    )
};
