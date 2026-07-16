/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.gov.scot" },
      { protocol: "https", hostname: "futurescot.com" },
      { protocol: "https", hostname: "www.finextra.com" },
      { protocol: "https", hostname: "www.chesterstandard.co.uk" },
      { protocol: "https", hostname: "financialit.net" },
    ],
  },
}

export default nextConfig
