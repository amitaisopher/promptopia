/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
        
    },
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
    webpack: (config, { isServer }) => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
};

export default nextConfig;
