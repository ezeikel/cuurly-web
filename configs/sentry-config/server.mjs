import * as Sentry from "@sentry/nextjs";
import { getBaseConfig } from "./base.mjs";

// eslint-disable-next-line import/prefer-default-export
export const initServerSentry = (dsn) => {
  Sentry.init({
    ...getBaseConfig(dsn),
    integrations: [Sentry.prismaIntegration()],
  });
};
