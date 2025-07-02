/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. A dd this to produce a static export
  output: 'export',

  // 2. Add the base path
  basePath: '/game-of-life',

  // 3. Disable image optimization (required for static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;