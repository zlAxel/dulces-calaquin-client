
// ! Importaciones de React Router DOM

import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

// ! Importaciones de Componentes

import { Login } from "./views/Auth/Login";
import { Register } from "./views/Auth/Register";

const Hola = () => <h1>Terrible pvton</h1>;

function App() {

    const { check } = useAuth(); // * Extraemos el estado de autenticación y la función para validar la sesión

    useEffect(() => {
        check(); // * Validamos si la sesión es activa
    }, [])
    
    
    return (
        <Routes>
            <Route path="/" element={ <Hola /> } exact />
            <Route path="/auth/login" element={ <Login /> } />
            <Route path="/auth/register" element={ <Register /> } />
        </Routes>
    )
}

export default App;
