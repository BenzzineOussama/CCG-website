/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/CCG-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/CCG-website' : '',
}

module.exports = nextConfig