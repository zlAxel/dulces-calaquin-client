
// ! Importaciones de React Router DOM

import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { LayoutAuth } from "./layouts/LayoutAuth";
import PrivateRoute from "./layouts/PrivateRoute";

// ! Importaciones de Vistas

import { Login } from "./views/Auth/Login";
import { LoginPunto } from "./views/Auth/LoginPunto";
import { Register } from "./views/Auth/Register";
import { Store } from "./views/Store";

function App() {
    const Hola = () => <span>Hola</span>;
    return (
        <Routes>
            {/**
             * // ! Rutas de la Aplicación
            */}
            <Route path="/" element={ <Layout /> } exact>
                <Route index element={ <Store /> } />
            </Route>
            {/**
             * // ! Rutas del administrador
            */}
            <Route path="/admin" element={ <Layout /> } exact>
                {/* // ! Utilizamos PrivateRoute para proteger la ruta */}
                <Route path="inicio" element={<PrivateRoute element={<Hola />} adminOnly redirect="/" />} />
                <Route path="products" element={<PrivateRoute element={<Hola />} adminOnly redirect="/" />} />
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
