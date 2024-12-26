/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**"
      }
    ]
  }
};

export default nextConfig;
