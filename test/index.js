const { saaslyLogger, saaslyMetric } = require("@saasly/logs-client-nodejs");

const apiKey =
  "api-key-NwcpyBMildAJSt8NkrqZVJ9mFzAoKoanzYPlBLAcrUxGLgP278tTbpGZRsrI20jC";

(async () => {
  await saaslyLogger({
    apiKey,
    // doTrackDebug: false,
    // doTrackError: false,
    // doTrackInfo: false,
    // doTrackLog: false,
    // doTrackWarn: false,
  });
})();

let obj = {
  foo: "bar 2",
};

console.log(`#202327122326173 `, obj);

saaslyMetric({
  apiKey,
  source: "test-app",
  variable: "some",
  value: 7,
});
