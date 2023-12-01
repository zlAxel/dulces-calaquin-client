
import {
    FireIcon,
    HomeIcon,
    ShoppingBagIcon,
    SquaresPlusIcon,
    UserPlusIcon,
} from '@heroicons/react/24/outline';
import { useApp } from '../hooks/useApp';


const Navigation = () => {
    const { userAdmin } = useApp();

    const navigation = ! userAdmin
    ? [
        {
          name: 'Comprar dulces',
          href: '/',
          icon: ShoppingBagIcon,
        },
        {
          name: 'Mis pedidos',
          href: '/orders',
          icon: FireIcon,
        },
      ]
    : [
        {
            name: 'Inicio',
            href: '/admin/inicio',
            icon: HomeIcon, 
        },
        {
            name: 'Productos',
            href: '/admin/products',
            icon: SquaresPlusIcon,
        },
        // {
        //     name: 'Usuarios',
        //     href: '/admin/users',   
        //     icon: UserPlusIcon,
        // }
      ];

  return navigation;

};

export default Navigation;
