/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['@prisma/client', 'prisma'],
  images: {
    domains: ["lh3.googleusercontent.com"]
  }
};

export default nextConfig;