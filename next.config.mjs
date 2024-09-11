/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";
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
        localeDetection: false,
    },
};
const analyzeBundle = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});
export default analyzeBundle(nextConfig);
