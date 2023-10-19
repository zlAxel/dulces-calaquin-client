
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState( false ); // * Estado para saber si el usuario está autenticado

    const navigate = useNavigate();

    // TODO | Creamos la función para iniciar sesión
    const login = async ( datos ) => {
        try {
            await csrf();
            await axiosInstance.post("/login", datos)
                .then( () => {
                    setIsAuthenticated( true );
                    navigate("/");
                });

        } catch (error) {
            console.log( error );
        }
    };
    
    // TODO | Creamos la función para cerrar sesión
    const logout = async () => {
        try {
            await axiosInstance.post("/logout")
                .then( () => {
                    // mutateUser();
                    setIsAuthenticated( false );
                });
        } catch (error) {
            console.log(error);
        }
    };

    // TODO | Validamos si la cookie existe
    const check = async () => {
        axiosInstance("/api/user")
        .then( () => {
            navigate("/");
        }).catch( () => {
            navigate("/auth/login");
        });
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
            isAuthenticated,
            login,
            logout,
            check,
        }}>
            { children }
        </AuthContext.Provider>
    );
};
