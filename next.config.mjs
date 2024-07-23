/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;
