/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        });
        return config;
    },
  reactStrictMode: true,
    // Enable gzip compression for all responses
    compress: true,
    // Image optimization configuration
    images: {
      formats: ['image/webp', 'image/avif'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.amazonaws.com', // For S3 images
        },
      ],
    },
  async rewrites(){
        return [
            {
                source:'/admin',
                destination:'/admin/index.html'
            }
        ]
    }
};

export default nextConfig;
