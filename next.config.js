/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async redirects() {
  //   return [
      // {
        // source: '/:path((?!coming-soon|pre-order|_error|public|img).*)',  // Redirect all exept selected
        // destination: '/coming-soon',
        // permanent: true,  // Redirection 304
      // }
  //   ]
  // },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
