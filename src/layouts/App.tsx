import React from 'react';

import Head from 'next/head';
import { useAtom } from 'jotai';
import { alertShow } from '../../store/Atom';
import { inter } from '../../libs/utils';
import { Navbar } from '@/components/Navbar';

export const LayoutApp = ({ children }: { children: React.ReactNode }) => {
    const [alert] = useAtom(alertShow);

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/assets/logo.svg" type="image/x-icon" />

                <title>Titanium Printing</title>
            </Head>

            <Navbar />
            <main className={`${inter.className} relative overflow-x-hidden mt-24`}>{children}</main>
        </>
    );
};
