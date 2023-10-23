
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Logo } from "../components/utility/Logo";
import { SideMenu } from "../components/layout/SideMenu";

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { check } = useAuth(); // * Extraemos el estado de autenticación y la función para validar la sesión

        useEffect(() => {
            check(); // * Validamos si la sesión es activa
        }, []);

    return (
        <>
            <div className="relative isolate">
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                    <div className="absolute left-[-40%] top-[-160%] -mt-36 transform-gpu opacity-40 rotate-180 blur-3xl xl:left-16 xl:-ml-80">
                        <div
                            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                            style={{
                                clipPath:
                                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                            }}
                        />
                    </div>
                </div>
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                    <div className="absolute right-[-10%] top-[-160%] -mt-36 transform-gpu opacity-40 rotate-180 blur-3xl xl:left-16 xl:-ml-80">
                        <div
                            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                            style={{
                                clipPath:
                                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                            }}
                        />
                    </div>
                </div>
                {/* // TODO | Menú lateral */}
                <SideMenu 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Borders */}
                <div className="h-3 lg:h-full lg:w-8 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:overflow-y-auto bg-gray-900 lg:pb-4" />
                <div className="h-3 lg:h-full lg:w-8 lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:block lg:overflow-y-auto bg-gray-900 lg:pb-4" />

                <div className="lg:px-8">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <Logo className="h-12" />

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-900/10" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 items-center self-stretch lg:gap-x-6">
                    <div className="relative flex flex-1">
                        
                        <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <img
                            className="h-8 w-8 rounded-full bg-gray-50"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            />
                            <span className="hidden lg:flex lg:items-center">
                            <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                Tom Cook
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
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                {({ active }) => (
                                    <a
                                    href={item.href}
                                    className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                    )}
                                    >
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
                </div>

                <main className="animate-fade-down animate-once">
                    <div className="mx-auto max-w-7xl mt-16 px-4 pb-12 sm:px-6 lg:px-8">
                        <div className="rounded-lg bg-white px-5 py-6 shadow-lg sm:px-6">
                            <Outlet />
                        </div>
                    </div>
                </main>
                </div>
            </div>
        </>
    )
}

