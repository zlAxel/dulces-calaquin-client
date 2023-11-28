

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    ChevronDownIcon,
    ArrowRightOnRectangleIcon,
    ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { Logo } from "../utility/Logo";
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../hooks/useApp';
import defaultProfilePic from '/media/profiles/default/profile_pic.webp';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export const Navbar = ({ setSidebarOpen, setCartOpen }) => {

    const { logout } = useAuth(); // * Obtenemos el hook para cerrar sesión
    const { user, cart }   = useApp(); // * Obtenemos el hook para cerrar sesión

    const userNavigation = [
        // { name: 'Your profile', url: '#' },
        { 
            name: 'Cerrar sesión', 
            icon: ArrowRightOnRectangleIcon,
            action: logout,
            url: '#',
        },
    ];

    return (
        <nav className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-lg sm:gap-x-6 sm:px-6 lg:px-8">
            <Logo className="h-12" />

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 items-center self-stretch lg:gap-x-6">
                <div className="relative flex flex-1">
                    <button onClick={() => setSidebarOpen(true)} type="button" className="-m-2.5 p-2.5 text-gray-700">
                        <span className="sr-only">Abrir menú</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    {/* <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Ver notificaciones</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                    <div className='flex gap-3 items-center'>
                        <button onClick={() => setCartOpen(true)} type="button" className="-m-2.5 p-2.5 text-gray-600 hover:text-primary-700 transition-colors">
                            <span className="sr-only">Ver carrito de compras</span>
                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className='text-xs font-bold text-gray-600'>
                            <span className="sr-only">{ `${cart.length} objetos en el carrito` }</span>
                            { cart.length }
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Abrir menú de usuario</span>
                            <img
                                className="h-8 w-8 rounded-full bg-gray-50"
                                src={ user?.profile_pic || defaultProfilePic }
                                alt="Foto de perfil"
                            />
                            <span className="hidden lg:flex lg:items-center">
                                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                    { user?.name }
                                </span>
                                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'group flex items-center px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-100'
                                            )}
                                            onClick={ item.action }
                                            >
                                            <item.icon
                                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500"
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </a>
                                    )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}
