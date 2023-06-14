/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_SOURCE,
      },
    ],
  },
};
