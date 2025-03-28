/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: process.env.IMAGE_PROTOCOL || "http",
        hostname: process.env.IMAGE_HOSTNAME || "localhost",
      },
    ],
  },
};

export default nextConfig;
