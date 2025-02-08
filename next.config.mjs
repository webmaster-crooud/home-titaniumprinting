/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
    // Konfigurasi images untuk mengizinkan hostname tertentu
    images: {
        remotePatterns: [
            {
                protocol: 'https', // atau 'https' sesuai protokol backend Anda
                hostname: 'api.titaniumprint.id',
                pathname: '/public/**', // Path yang diizinkan
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
                pathname: '/public/**',
            },
        ],
        // Atau gunakan `domains` untuk hostnames statis
        // domains: ['127.0.0.1', 'assets.example.com'],
    },

    async rewrites() {
        return [
            {
                source: '/member',
                destination: '/users',
            },
            {
                source: '/member/keranjang',
                destination: '/users/cart',
            },
            {
                source: '/produk',
                destination: '/products',
            },
            {
                source: '/produk/:slug',
                destination: '/products/:slug',
            },
            {
                source: '/tentang-kami',
                destination: '/about-us',
            },
        ];
    },
};

export default nextConfig;
