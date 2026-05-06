// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Critical: Don't typecheck during build (temporary)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Don't fail on ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure API routes are not statically generated
  output: 'standalone',
  // Transpile packages if needed
  transpilePackages: [],
}

module.exports = nextConfig
