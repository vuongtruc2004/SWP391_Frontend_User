import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['mui-one-time-password-input'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost'
      }
    ]
  },
};

export default nextConfig;
