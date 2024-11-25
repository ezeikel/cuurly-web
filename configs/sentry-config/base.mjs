// eslint-disable-next-line import/prefer-default-export
export const getBaseConfig = (dsn) => ({
  dsn,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === "development",
  environment: process.env.NODE_ENV,
});
