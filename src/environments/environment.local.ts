export const environment = {
  production: false,
  MESSAGE_FEED: 'ws://localhost:8080/messages/_streams/all',
  MESSAGE_URL : 'http://localhost:8080/messages/?wm=upsert',
  SENTRY_DSN: "https://266665e29f964150b4f62aa9395046be@o912054.ingest.sentry.io/5848878",
  SENTRY_TRACING_ORIGINS: ["localhost"],
  RECONNECTION_DELAY: 3000
};
