// import { withSentry } from "@cuurly/sentry-config/next";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    config.ignoreWarnings = [
      {
        module: /@opentelemetry\/instrumentation/,
        message: /Critical dependency/,
      },
      { module: /@prisma\/instrumentation/, message: /Critical dependency/ },
    ];

    return config;
  },
};

export default nextConfig;

// export default withSentry(nextConfig, {
//   project: "cuurly-web",
// });
