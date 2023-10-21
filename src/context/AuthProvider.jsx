
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import { useApp } from "../hooks/useApp";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { setAlerts } = useApp();         // * Obtenemos la función para mostrar alertas
    const navigate      = useNavigate();    // * Obtenemos la función para navegar entre rutas

    const [title, setTitle] = useState('');       // * Creamos el state para el título de la página
    const [subtitle, setSubtitle] = useState(''); // * Creamos el state para el subtítulo de la página

    // TODO | Creamos la función para iniciar sesión
    const login = async ( datos ) => {
        try {
            await csrf();
            await axiosInstance.post("/login", datos)
                .then( () => {
                    navigate("/");
                });

        } catch (error) {
            setAlerts( Object.values( error.response.data.errors ) );
        }
    };
    
    // TODO | Creamos la función para cerrar sesión
    const logout = async () => {
        try {
            await axiosInstance.post("/logout")
                .then( () => {
                    // mutateUser();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const register = async ( datos ) => {
        try {
            await csrf();
            await axiosInstance.post("/register", datos)
                .then( () => {
                    navigate("/");
                });

        } catch (error) {
            setAlerts( Object.values(error.response.data.errors) );
        }
    };

    // TODO | Validamos si la cookie existe
    const check = async ( from ) => {
        axiosInstance("/api/user")
        .then( () => {
            if ( from === "Auth" )
                navigate("/"); 
        })
        .catch( () => {
            if ( from !== "Auth" )
                navigate("/auth/login");
        });
    };

    // TODO | Creamos la función para buscar un usuario
    const searchUser = async ( datos ) => {
        try {
            const { data } = await axiosInstance.post("/api/search-user", datos)
                .catch( (error) => {
                    console.log(error);
                });

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // TODO | Creamos la función para obtener el CSRF Token
    const csrf = async () => {
        try {
            await axiosInstance("/sanctum/csrf-cookie");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            check,
            register,
            searchUser,
            title, subtitle,
            setTitle, setSubtitle,
        }}>
            { children }
        </AuthContext.Provider>
    );
};
