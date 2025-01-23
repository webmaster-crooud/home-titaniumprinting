import { useCallback, useEffect, useState } from 'react';
import { AUTH } from '../libs/utils';
import { jwtDecode } from 'jwt-decode';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { authAccount } from '../store/Atom';

interface Decoded {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    username: string;
    exp: number;
}

export const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [expired, setExpired] = useState<number | null>(null);
    const [isTokenChecked, setIsTokenChecked] = useState(false); // State untuk menandai pengecekan token
    const setAccount = useSetAtom(authAccount);
    const router = useRouter();

    const decodeAndSetAccount = useCallback(
        (jwt: string) => {
            try {
                const decoded: Decoded = jwtDecode(jwt);
                setAccount({
                    email: decoded.email,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                    role: decoded.role,
                    username: decoded.username,
                });
                setExpired(decoded.exp);
                setToken(jwt);
            } catch (error) {
                console.error('Failed to decode token', error);
                setToken(null);
                setExpired(null);
            }
        },
        [setAccount],
    );

    const refreshToken = useCallback(async () => {
        try {
            const response = await fetch(`${AUTH}/token`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                return null;
            }

            const result = await response.json();
            if (result.token) {
                decodeAndSetAccount(result.token);
                return result.token;
            }

            return null;
        } catch (error) {
            console.error('Token refresh error:', error);
            return null;
        }
    }, [decodeAndSetAccount]);

    const getValidToken = useCallback(async () => {
        if (token && expired && expired * 1000 > Date.now()) {
            return token;
        }

        const newToken = await refreshToken();
        // if (!newToken) {
        //     // Redirect ke halaman login jika tidak ada token yang valid
        //     router.push(`${process.env.NEXT_PUBLIC_HOME}/login`);
        //     return null;
        // }
        return newToken;
    }, [token, expired, refreshToken]);

    useEffect(() => {
        if (isTokenChecked) return; // Hentikan jika pengecekan sudah dilakukan

        const initToken = async () => {
            const refreshedToken = await refreshToken();
            // if (!refreshedToken && router.pathname !== '/login') {
            //     router.push(`${process.env.NEXT_PUBLIC_HOME}/login`);
            //     return;
            // }
            decodeAndSetAccount(refreshedToken);
            setIsTokenChecked(true); // Tandai bahwa pengecekan sudah dilakukan
        };
        initToken();
    }, [isTokenChecked, router.pathname, refreshToken, decodeAndSetAccount]);

    return { token, refreshToken, expired, getValidToken };
};
