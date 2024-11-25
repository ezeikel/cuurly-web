import { withSentry } from "@cuurly/sentry-config/next";

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  compiler: {},
};

export default withSentry(nextConfig, {
  project: "cuurly-web",
});
