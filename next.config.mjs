/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  experimental: {
    turbo: false,
  },
  images: {
    domains: ['picsum.photos'],
  },
}
export default nextConfig
