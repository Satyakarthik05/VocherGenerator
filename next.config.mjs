/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // keep ignoring TypeScript build errors
  },
  images: {
    unoptimized: true, // keep image optimization off
  },
  output: "export", // <-- add this line for static export
}

export default nextConfig
