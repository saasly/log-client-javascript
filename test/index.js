const { default: saaslyLogger } = require("@saasly/logs-client-nodejs");
(async () => {
  await saaslyLogger({
    apiKey:
      "api-key-NwcpyBMildAJSt8NkrqZVJ9mFzAoKoanzYPlBLAcrUxGLgP278tTbpGZRsrI20jC",
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

// (async () => {
//   await new Promise((resolve) => {
//     setTimeout(resolve, 5000);
//   });
// })();

// throw new Error("hi world!");
