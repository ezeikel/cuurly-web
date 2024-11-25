import * as Sentry from "@sentry/nextjs";
import { getBaseConfig } from "./base.mjs";

// eslint-disable-next-line import/prefer-default-export
export const initClientSentry = (dsn) => {
  Sentry.init({
    ...getBaseConfig(dsn),
    integrations: [Sentry.replayIntegration()],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
};
