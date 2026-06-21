/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
