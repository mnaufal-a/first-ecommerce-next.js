/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  images: {
    domains: ["lh3.googleusercontent.com"]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [
        ...(config.externals || []),
        '@prisma/client',
        'prisma'
      ]
    }
    return config
  }
};

export default nextConfig;