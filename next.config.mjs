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
                protocol: 'http', // atau 'https' sesuai protokol backend Anda
                hostname: '127.0.0.1',
                port: '3001',
                pathname: '/public/**', // Path yang diizinkan
            },
            {
                protocol: 'https',
                hostname: 'assets.example.com',
            },
        ],
        // Atau gunakan `domains` untuk hostnames statis
        // domains: ['127.0.0.1', 'assets.example.com'],
    },

    async rewrites() {
        return [
            {
                source: '/produk',
                destination: '/products',
            },
            {
                source: '/produk/:slug',
                destination: '/products/:slug',
            },
        ];
    },
};

export default nextConfig;
