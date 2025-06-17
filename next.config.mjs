/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 tells Next.js to generate static export to /out

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
};

export default nextConfig;
