// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // MESSAGE_FEED: 'wss://demo.restheart.org/messages/_streams/all',
  // MESSAGE_URL : 'https://demo.restheart.org/messages/',
  MESSAGE_FEED: 'ws://localhost:8080/messages/_streams/all',
  MESSAGE_URL : 'http://localhost:8080/messages/',
  SENTRY_DSN: "https://266665e29f964150b4f62aa9395046be@o912054.ingest.sentry.io/5848878",
  SENTRY_TRACING_ORIGINS: ["localhost"]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
