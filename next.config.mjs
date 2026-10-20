/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Prevent Next.js from auto-generating AGENTS.md / CLAUDE.md
  agentRules: false,
}

export default nextConfig
