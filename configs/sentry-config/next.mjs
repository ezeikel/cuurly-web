import { withSentryConfig } from "@sentry/nextjs";

export const getSentryWebpackPluginOptions = ({ org, project }) => ({
  silent: false,
  org: org || "ezeikel",
  project: project || "cuurly-web",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});

export const withSentry = (config, options) => {
  return withSentryConfig(config, getSentryWebpackPluginOptions(options));
};
