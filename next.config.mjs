/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // keep ignoring TypeScript build errors
  },
  images: {
    unoptimized: true, // keep image optimization off
  }, 
}

export default nextConfig
