
import { toast } from "sonner";
import { Notification } from "../components/Notification";

import { createContext, useEffect, useState } from "react";
import { deleteProduct, getAllProducts, getProducts, getTopProducts } from "../data/products";
import { storePurchase, getRecentPurchases } from "../data/purchases";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [toggleProductsModal, setToggleProductsModal] = useState(false);  // * Estado para mostrar/ocultar el modal de productos
    const [deleteProductModal, setDeleteProductModal] = useState(false);    // * Estado para mostrar/ocultar el modal de eliminar producto
    const [toggleModalProduct, setToggleModalProduct] = useState(false);    // * Estado para mostrar/ocultar el modal de productos
    const [deleteProductID, setDeleteProductID] = useState(null);           // * Estado para almacenar el ID del producto a eliminar
    const [updateProductID, setUpdateProductID] = useState(null);           // * Estado para almacenar el ID del producto a actualizar
    const [products, setProducts] = useState([]);                           // * Estado para almacenar los productos
    const [productsAll, setAllProducts] = useState([]);                     // * Estado para almacenar los todos los productos
    const [topProducts, setTopProducts] = useState([]);                     // * Estado para almacenar los productos más vendidos
    const [recentPurchases, setRecentPurchases] = useState([]);             // * Estado para almacenar las compras recientes 
    const [recentProducts, setRecentProducts] = useState([]);               // * Estado para almacenar los productos recientes
    const [userAdmin, setUserAdmin] = useState(null);                       // * Estado para almacenar el usuario administrador
    const [availableOptionProduct, setAvailableOptionProduct] = useState(null); // * Estado para almacenar la opción de disponibilidad de un producto
    
    const [user, setUser] = useState( {} ); // * Estado para almacenar el usuario
    const [cart, setCart] = useState( JSON.parse(localStorage.getItem('cart')) || [] ); // * Estado para almacenar el carrito

    const currentLocation = useLocation();

    useEffect(() => {
        getUserAdmin(); // ? Validamos si el usuario es administrador
    }, []);

    // ? Reseteamos el estado de los ID's
    useEffect(() => {
        if ( ! toggleModalProduct ){
            setDeleteProductID (null); 
            setUpdateProductID (null); 
        }
    }, [toggleModalProduct]);

    useEffect(() => {
        if(Object.keys(user).length > 0){
            // ? Almacenamos el carrito en el localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // ? Validamos los productos del carrito
            validateProducts();
        }
    }, [cart])

    useEffect(() => {
        // ? Obtenemos los productos de la API si el usuario existe
        if ( Object.keys(user).length > 0 ) {
            // ? Almacenamos al usuario en el localStorage
            localStorage.setItem('user', JSON.stringify(user));

            if( currentLocation.pathname === "/" ){
                getTopProducts().then( data => {  // * Obtenemos los productos más vendidos de la API
                    setTopProducts( data );
                    validateProducts();           // Validamos los productos del carrito
                }).catch( () => {
                    setTopProducts( [] );
                });    
                getProducts().then( data => {     // * Obtenemos los productos de la API
                    setProducts( data );
                }).catch( () => {
                    setProducts( [] );
                });                      
                getRecentPurchases().then(  // * Obtenemos las compras recientes de la API
                    data => setRecentPurchases( data ) )
                .catch( () => {
                    setRecentPurchases( [] );
                });
            }

            getUserAdmin(); // ? Validamos si el usuario es administrador
        }
    }, [user]);

    const handleGetAllProducts = () => {
        getAllProducts().then( data => {     // * Obtenemos los productos de la API
            setAllProducts( data );
        }).catch( () => {
            setAllProducts( [] );
        }); 
    };

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

    const handleAddToCart = (product, amount) => {
        // ? Creamos el objeto con la cantidad
        const productFinal = { ...product, amount };

        // // ? Antes de agregar el producto a la lista de recientes, verificamos que no esté ya en la lista
        // const isRecent = recentProducts.find( product => product.id === productFinal.id );
        // if ( ! isRecent ) setRecentProducts([productFinal, ...recentProducts]);

        // ? Antes de agregar el producto al carrito, verificamos que no esté ya en el carrito, si está, sumamos la cantidad
        const isCart = cart.find( product => product.id === productFinal.id );
        if ( isCart ) {
            const newCart = cart.map( product => {
                if ( product.id === productFinal.id ) {
                    product.amount += productFinal.amount;
                    return product;
                }
                return product;
            });
            // ? Agregamos el producto al carrito
            setCart(newCart);
        }else{
            // ? Agregamos el producto al carrito
            setCart( cart => [...cart, productFinal] );
        }

        // ? Mostramos notificación
        handleNotification('Producto agregado', 'Agregaste correctamente tu producto al carrito.', 'success', 10000);
    };

    // ? Creamos función para eliminar un producto del carrito
    const handleDeleteProduct = (id) => {
        const newCart = cart.filter( product => product.id != id );
        setCart( newCart );
    };

    // ? Creamos función para eliminar un producto del administrador
    const handleDeleteProductAdmin = async () => {
        await deleteProduct( deleteProductID ).then( data => {
            // ? Mostramos notificación
            handleNotification('Producto eliminado', data, 'success', 10000);
            handleGetAllProducts();
            setDeleteProductModal(false);
        }).catch( error => {
            console.log(error);
        });
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

    // ? Creamos función para saber si el usuario es administrador
    const getUserAdmin = async () => {
        try {
            const response = await axiosInstance("/api/user-admin");
            
            setUserAdmin(response.data.user);
        } catch (error) {
            setUserAdmin(null);
        }
    }

    /**
     * Validamos si los productos se encuentran en el carrito, 
     * si es así agregamos la cantidad, y un identificador.
     * Crearemos un nuevo array con los productos del carrito
    */ 
    function validateProducts() {
        setTopProducts(prevProducts => {
            const newProducts = prevProducts.map(product => {
                const isCart = cart.find(cartProduct => cartProduct.id === product.id);
                if (isCart) {
                    product.amount = isCart.amount;
                    product.isCart = true;
                }else{
                    product.amount = 0;
                    product.isCart = false;
                }
                return product;
            });
            return newProducts;
        });
    }

    return (
        <AppContext.Provider value={{
            user, setUser,
            alerts, setAlerts,
            toggleModal, setToggleModal,
            toggleProductsModal, setToggleProductsModal,
            deleteProductModal, setDeleteProductModal,
            cart, setCart,
            products, setProducts, topProducts,
            productsAll, setAllProducts,
            recentPurchases, 
            recentProducts, setRecentProducts,
            userAdmin, setUserAdmin,
            toggleModalProduct, setToggleModalProduct,
            availableOptionProduct, setAvailableOptionProduct,
            deleteProductID, setDeleteProductID,
            updateProductID, setUpdateProductID,
            handleNotification, handleProductAmount, handleDeleteProduct, handleCreatePurchase, handleAddToCart,
            handleGetAllProducts, handleDeleteProductAdmin, 
            }}>
            { children }
        </AppContext.Provider>
    )
};
