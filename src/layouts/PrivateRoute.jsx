
import { Navigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
// import { getUserAdmin } from '../data/users';

function PrivateRoute ({ element, adminOnly, redirect }) {

    const { userAdmin } = useApp();
    
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
