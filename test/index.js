const { default: saaslyLogger } = require("@saasly/logs-client-nodejs");
saaslyLogger({
  apiKey:
    "api-key-NwcpyBMildAJSt8NkrqZVJ9mFzAoKoanzYPlBLAcrUxGLgP278tTbpGZRsrI20jC",
});

console.log(`#202327020342747 hi`);
console.error(`#202327020342747 hi`);

console.debug(`#202327020343586 saaslyLogger: `, saaslyLogger);
