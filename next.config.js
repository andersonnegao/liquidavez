const path = require("path");

const locales = ["en", "pt"];
const defaultLocale = "en";

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales,
    defaultLocale,
  },
  webpack: (config) => {
    config.resolve.alias["next-intl"] = path.resolve(
      __dirname,
      "src/i18n/next-intl.tsx"
    );

    return config;
  },
  images: {
    //minimumCacheTTL: 604800,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evttcntmeqfjqcbkxehl.supabase.co",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/gladius/image/fetch/**",
      },
    ],
    //loader: 'custom',
  },
};
