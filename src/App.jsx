
// ! Importaciones de React Router DOM

import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { LayoutAuth } from "./layouts/LayoutAuth";

// ! Importaciones de Componentes

import { Login } from "./views/Auth/Login";
import { Register } from "./views/Auth/Register";

const Hola = () => <h1>Terrible pvton</h1>;

function App() {
    return (
        <Routes>

            {/**
             * // ! Rutas de la Aplicación
            */}
            <Route path="/" element={ <Layout /> } exact>
                <Route index element={ <Hola /> } />
            </Route>

            {/**
             * // ! Rutas de Autenticación 
            */}
            <Route path="/auth" element={ <LayoutAuth /> } >
                <Route index element={ <Navigate to="login" /> } />
                
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={<Register />} />

                {/* // ? Agregar login para punto de venta */}
                
            </Route>
        </Routes>
    )
}

export default App;
