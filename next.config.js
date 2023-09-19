/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
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
