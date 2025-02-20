// const withNextIntl = require('next-intl/plugin')();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "standalone",
//   images: {
//     domains: ['al-khalil-v1.s3.me-south-1.amazonaws.com'],
//   },

//   reactStrictMode: false,
//   // Other Next.js config options can be added here
// };

// module.exports = withNextIntl(nextConfig);


const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    output: "standalone",
    images: {
        domains: ['al-khalil-v1.s3.me-south-1.amazonaws.com'],
        unoptimized: process.env.NODE_ENV === 'development', // Disable optimization locally
    },
    reactStrictMode: false,
    swcMinify: true, // Enable SWC minification for faster builds
    experimental: {
        appDir: true, // Use experimental app directory if applicable
        concurrentFeatures: true,
    },
};

module.exports = withNextIntl(nextConfig);
