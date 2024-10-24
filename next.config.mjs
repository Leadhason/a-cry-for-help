/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
        pathname: '/**',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
