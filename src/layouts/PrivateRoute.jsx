
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosInstance } from '../config/axios';
// import { getUserAdmin } from '../data/users';

function PrivateRoute ({ element, adminOnly, redirect }) {

    const [userAdmin, setUserAdmin] = useState(null);
    useEffect(() => {
        const getUserAdmin = async () => {
            try {
                const response = await axiosInstance("/api/user-admin");
                
                setUserAdmin(response.data.user);
            } catch (error) {
                console.log(error);
            }
        }

        getUserAdmin();
    }, []);

    // ? Mostramos un mensaje de carga mientras se obtiene el usuario
    if (userAdmin === null) {
        return <div>Cargando...</div>;
    }

    // ? Si el usuario no es un administrador y la ruta requiere administrador, redirige a otra página
    if ( adminOnly && ! userAdmin ) {
        return <Navigate to={redirect} />;
    }
  
    // ? Renderizamos el componente
    return element;
};

export default PrivateRoute;
