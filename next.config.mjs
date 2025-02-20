import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "al-khalil-v1.s3.me-south-1.amazonaws.com",
        pathname: "/alKhalil/**",
      },
    ],
  },

};

export default withNextIntl(nextConfig);