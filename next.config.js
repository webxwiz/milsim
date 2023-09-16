/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: process.env.HOST_NAME_SERVER,
            port: '',
            // pathname: '/account123/**',
          },
        ],
      },
}

module.exports = nextConfig
