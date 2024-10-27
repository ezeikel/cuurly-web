import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  compiler: {},
};

const sentryOptions = {
  silent: false,
  org: "ezeikel",
  project: "cuurly-web",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

const configWithSentry = withSentryConfig(nextConfig, sentryOptions);

export default configWithSentry;
