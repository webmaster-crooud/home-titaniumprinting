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

export const useAuthToken = (isPrivatePage: boolean = false) => {
    const [token, setToken] = useState<string | null>(null);
    const [expired, setExpired] = useState<number | null>(null);
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const setAccount = useSetAtom(authAccount);
    const router = useRouter();

    const decodeAndSetAccount = useCallback(
        (jwt: string) => {
            try {
                console.log(jwt);
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
        if (!newToken && isPrivatePage) {
            // Redirect hanya jika bukan halaman publik
            router.push(`${process.env.NEXT_PUBLIC_HOME}/login`);
            return null;
        }
        return newToken;
    }, [token, expired, refreshToken, router, isPrivatePage]);

    useEffect(() => {
        if (isTokenChecked) return;
        const initToken = async () => {
            const refreshedToken = await refreshToken();
            if (refreshedToken) {
                decodeAndSetAccount(refreshedToken);
            } else if (isPrivatePage) {
                // Redirect hanya jika bukan halaman publik
                router.push(`${process.env.NEXT_PUBLIC_HOME}/login`);
            }
            setIsTokenChecked(true);
        };
        initToken();
    }, [isTokenChecked, refreshToken, decodeAndSetAccount, router, isPrivatePage]);

    return { token, refreshToken, expired, getValidToken };
};
