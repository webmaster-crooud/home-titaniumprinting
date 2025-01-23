export const fetchWithAuth = async (
    getValidToken: () => Promise<string | null>, // Gunakan getValidToken sebagai parameter
    url: string,
    options: RequestInit = {},
): Promise<Response> => {
    try {
        // Dapatkan token yang valid (akan melakukan refresh jika token expired)
        const validToken = await getValidToken();

        if (!validToken) {
            // Redirect ke halaman login jika tidak ada token yang valid
            window.location.href = `${process.env.NEXT_PUBLIC_HOME}/login`;
            throw new Error('Authentication failed');
        }

        // Tambahkan token ke header Authorization
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${validToken}`,
        };

        // Lakukan fetch dengan token yang valid
        const response = await fetch(url, { ...options, headers });

        // Jika masih mendapatkan 401/403, berarti token refresh juga tidak valid
        if (response.status === 401 || response.status === 403) {
            window.location.href = `${process.env.NEXT_PUBLIC_HOME}/login`;
            throw new Error('Authentication failed');
        }

        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
