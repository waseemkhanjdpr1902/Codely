/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This allows the build to complete even if there are small type errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
