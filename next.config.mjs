/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "via.placeholder.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.hizliresim.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    i18n: {
        locales: ["en", "tr"],
        defaultLocale: "tr",
    },
};

export default nextConfig;
