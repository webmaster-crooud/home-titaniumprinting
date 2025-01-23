import React from 'react';
import { NavBreadcrumb } from '../components/NavBreadcrumb';

import { IconPower, IconShoppingBagCheck, IconUserFilled } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useAuthToken } from '../../hooks/useAuthToken';
import { AUTH } from '../../libs/utils';
import { useAtomValue } from 'jotai';
import { authAccount } from '../../store/Atom';
import Link from 'next/link';
import { NavBreadcrumbData } from '../../libs/type';

type propsUserLayouts = {
    children: React.ReactNode;
    navBreadcrumb: NavBreadcrumbData[];
};

export const UserLayouts: React.FC<propsUserLayouts> = ({ children, navBreadcrumb }) => {
    const router = useRouter();
    const { pathname } = router;

    const handlerLogout = async () => {
        try {
            await fetch(`${AUTH}/logout`, {
                method: 'DELETE',
                credentials: 'include', // Critical for cookie transmission
            });

            router.push(`${process.env.NEXT_PUBLIC_HOME}`);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <NavBreadcrumb data={navBreadcrumb} />
            <section className="py-16 bg-white">
                <div className="relative w-11/12 mx-auto">
                    <div className="flex justify-center border rounded-lg border-light-gray">
                        <div className="top-0 p-5 border-r w-80 bg-white-primary border-light-gray">
                            <h3 className="text-base font-semibold text-dark-primary">Manu</h3>
                            <ul className="flex flex-col mt-5 gap-y-3">
                                <li>
                                    <Link
                                        href="/"
                                        className={`flex items-center justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3 px-4 py-2 rounded-lg border border-light-gray text-gray ${
                                            pathname === '/users' && 'bg-white text-dark-primary'
                                        }`}
                                    >
                                        <IconUserFilled
                                            size={18}
                                            className={`${pathname === '/users' ? 'text-dark-primary' : 'text-gray'}`}
                                        />
                                        <span className="text-sm">Akun</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={'/member/keranjang'}
                                        className={`flex items-center justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3 px-4 py-2 rounded-lg border border-light-gray ${
                                            pathname === '/users/cart' && ' bg-white text-dark-primary'
                                        }`}
                                    >
                                        <IconShoppingBagCheck
                                            size={18}
                                            className={`${
                                                pathname === '/users/cart' ? 'text-dark-primary' : 'text-gray'
                                            }`}
                                        />
                                        <span className="text-sm">Keranjang</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={handlerLogout}
                                        className={`flex items-center w-full justify-start gap-1 transition-transform duration-300 ease-out hover:translate-x-3 px-4 py-2 rounded-lg border bg-danger border-light-gray`}
                                    >
                                        <IconPower size={18} className="text-white" />
                                        <span className="text-sm text-white">Keluar</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {children}
                    </div>
                </div>
            </section>
        </>
    );
};
