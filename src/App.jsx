
// ! Importaciones de React Router DOM

import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { LayoutAuth } from "./layouts/LayoutAuth";

// ! Importaciones de Vistas

import { Login } from "./views/Auth/Login";
import { LoginPunto } from "./views/Auth/LoginPunto";
import { Register } from "./views/Auth/Register";
import { Store } from "./views/Store";

function App() {
    return (
        <Routes>

            {/**
             * // ! Rutas de la Aplicación
            */}
            <Route path="/" element={ <Layout /> } exact>
                <Route index element={ <Store /> } />
            </Route>

            {/**
             * // ! Rutas de Autenticación 
            */}
            <Route path="/auth" element={ <LayoutAuth /> } >
                <Route index element={ <Navigate to="login" /> } />
                
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={<Register />} />

                {/* // ? Agregar login para punto de venta */}
                <Route path="punto-venta" element={ <LoginPunto /> } />
            </Route>
        </Routes>
    )
}

export default App;
