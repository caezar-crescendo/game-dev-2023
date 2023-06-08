module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["images.ctfassets.net"],
    },
    headers: () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
};