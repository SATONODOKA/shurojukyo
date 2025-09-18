/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify deployment optimization
  output: process.env.NETLIFY ? 'standalone' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
  // Fix webpack chunk loading issues
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
    }
    
    // Fix runtime module resolution
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    }
    
    return config
  },
  // Optimize chunk loading
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-select'],
  },
}
export default nextConfig
