const { default: saaslyLogger } = require("@saasly/logs-client-nodejs");
saaslyLogger({
  apiKey:
    "api-key-NwcpyBMildAJSt8NkrqZVJ9mFzAoKoanzYPlBLAcrUxGLgP278tTbpGZRsrI20jC",
});

let obj = {
  foo: "bar",
};

console.log(`#202327122326173 `, obj);

throw new Error("hi world!");
