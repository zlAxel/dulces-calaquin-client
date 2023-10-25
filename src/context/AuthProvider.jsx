
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import { useApp } from "../hooks/useApp";
import CryptoJS from "crypto-js";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();    // * Obtenemos la función para navegar entre rutas

    const { setAlerts, setUser } = useApp();         // * Obtenemos la función para mostrar alertas

    const [title, setTitle] = useState('');       // * Creamos el state para el título de la página
    const [subtitle, setSubtitle] = useState(''); // * Creamos el state para el subtítulo de la página
    const [loginType, setLoginType] = useState( window.localStorage.getItem('login_type') || 'login'); // * Creamos el state para saber a donde redireccionar
    const secretPass = import.meta.env.VITE_SECRET_PASS;

    // TODO | Creamos la función para iniciar sesión
    const login = async ( datos ) => {
        try {
            // ? Obtenemos la contraseña con destructuring
            let { password } = datos;

            const passwordCrypt = encryptData(password, secretPass); // * Encriptamos la contraseña
            datos.password      = passwordCrypt; // * Metemos la contraseña en el objeto
            
            await csrf();
            await axiosInstance.post("/login", datos)
                .then( () => {
                    window.localStorage.setItem("login_type", "login");
                    navigate("/");
                });

        } catch (error) {
            setAlerts( Object.values( error.response.data.errors ) );
        }
    };

    // TODO | Creamos la función para iniciar sesión en el punto de venta
    const login_punto = async ( datos ) => {
        try {
            // ? Obtenemos la contraseña con destructuring
            let { pin } = datos;

            const pinCrypt = encryptData(pin, secretPass); // * Encriptamos la contraseña
            datos.pin      = pinCrypt; // * Metemos la contraseña en el objeto

            await csrf();
            await axiosInstance.post("/login-punto", datos)
                .then( () => {
                    window.localStorage.setItem("login_type", "login_punto");
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
                    if ( loginType === "login" )
                        navigate("/auth/login");
                    else
                        navigate("/auth/punto-venta");
                });
        } catch (error) {
            console.log(error);
        }
    };

    const register = async ( datos ) => {
        try {
            // ? Obtenemos la contraseña con destructuring
            let { password, password_confirmation, pin } = datos;

            const passwordCrypt             = encryptData(password, secretPass);                // * Encriptamos la contraseña
            const passwordConfirmationCrypt = encryptData(password_confirmation, secretPass);   // * Encriptamos la contraseña de confirmación
            const pinCrypt                  = encryptData(pin, secretPass);                     // * Encriptamos el PIN 

            datos.password              = passwordCrypt; // * Metemos la contraseña en el objeto
            datos.password_confirmation = passwordConfirmationCrypt; // * Metemos la contraseña en el objeto
            datos.pin                   = pinCrypt; // * Metemos la contraseña en el objeto

            await csrf();
            await axiosInstance.post("/register", datos)
                .then( () => {
                    navigate("/");
                });

        } catch (error) {
            setAlerts( Object.values(error.response.data.errors) );
        }
    };

    // TODO | Validamos si la sesión está activa
    const check = async ( from ) => {
        axiosInstance("/api/user")
        .then( user => {
            // ? Guardamos al usuario en el state
            setUser( user.data );

            if ( from === "Auth" )
                navigate("/"); 
        })
        .catch( () => {
            // ? Vaciamos el state del usuario
            setUser({});

            if ( from !== "Auth" ){
                if ( loginType === "login" )
                    navigate("/auth/login");
                else
                    navigate("/auth/punto-venta");
            }
        });
    };

    // TODO | Creamos la función para buscar un usuario
    const searchUser = async ( datos ) => {
        try {
            const data = await axiosInstance.post("/api/search-user", datos)
                .catch( (error) => {
                    setAlerts( error.response.data.errors.email );
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

    // TODO | Creamos la función para encriptar datos
    const encryptData = (text, secretKey) => {
        let iv = CryptoJS.lib.WordArray.random(16),
            // * Remover la parte 'base64' de la variable APP_KEY del archivo .env
            key = CryptoJS.enc.Base64.parse(secretKey.slice(7));
        let options = {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        };
        // * Usar solo text, no JSON.stringify(text), para que no ponga comillas dobles a los textos
        let encrypted = CryptoJS.AES.encrypt(text, key, options);
        // // Usar JSON.stringify(data) en lugar de solo data, dará pondrá comillas dobles a los datos
        // // let encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), key, options);
        encrypted = encrypted.toString();
        iv = CryptoJS.enc.Base64.stringify(iv);
        let result = {
            iv: iv,
            value: encrypted,
            mac: CryptoJS.HmacSHA256(iv + encrypted, key).toString(),
        };
        result = JSON.stringify(result);
        result = CryptoJS.enc.Utf8.parse(result);
        return CryptoJS.enc.Base64.stringify(result);
    };

    return (
        <AuthContext.Provider value={{
            login,
            login_punto,
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
