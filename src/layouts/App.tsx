import React, { useEffect } from 'react';

import Head from 'next/head';
import { useAtom } from 'jotai';
import { alertShow } from '../../store/Atom';
import { inter } from '../../libs/utils';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuthToken } from '../../hooks/useAuthToken';

export const LayoutApp = ({ children }: { children: React.ReactNode }) => {
    const [alert] = useAtom(alertShow);
    useAuthToken();
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/assets/logo.svg" type="image/x-icon" />
                <title>Titanium Printing</title>
            </Head>

            <Navbar />

            <main className={`${inter.className}`}>{children}</main>

            <Footer />
        </>
    );
};
