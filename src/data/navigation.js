
import {
    FireIcon,
    HomeIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { 
        name: 'Dashboard', 
        href: '#', 
        icon: HomeIcon, 
        current: true 
    },
    { 
        name: 'Comprar dulces', 
        href: '#', 
        icon: ShoppingBagIcon, 
        current: false 
    }
];

export default navigation;
