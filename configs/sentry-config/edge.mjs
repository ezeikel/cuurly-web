import * as Sentry from "@sentry/nextjs";
import { getBaseConfig } from "./base.mjs";

// eslint-disable-next-line import/prefer-default-export
export const initEdgeSentry = (dsn) => {
  Sentry.init({
    ...getBaseConfig(dsn),
  });
};
