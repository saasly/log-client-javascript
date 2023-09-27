## Free cloud logging solution for NodeJS 🎉

`npm i @saasly/logs-client-nodejs`

### Usage is extremely simple

1. Install package & add the code to your index.ts or index.js file before any of your code
2. Get your **FREE API KEY** at https://client.saasly.io

```
import saaslyLogger from "@saasly/logs-client-nodejs";
saaslyLogger({apiKey: "YOUR_API_KEY"});
```

3. Continue using `console.log`, `console.error`, `console.warn`, `console.info`, `console.debug`

Enjoy 😍


-----


If you want to use `require`:

```javascript
const {default: saaslyLogger} = require("@saasly/logs-client-nodejs");
saaslyLogger({apiKey: "YOUR_API_KEY"});

```

### Free cloud logging helper options

| Option       | Required? | Default   | Description                                                                                                                                                                                                                                                                                                                            |
|--------------|-----------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey       | Required  | undefined | Your API key, get for free at https://client.saasly.io                                                                                                                                                                                                                                                                                 |
| source       | Optional  | undefined | Should be some identifier showing location where app runs. Could be process.env.NODE_ENV or some process name like "api", "cron-runner"                                                                                                                                                                                                |
| identifier   | Optional  | undefined | If log message includes `#something` the "something" part will be set as identifier. You could setup your IDE to add random string, or can just type in random things while logging. Very useful when need to find exact console.log by error/log message. E.g. `console.log('#27014143832 Hello')`. Identifier would be `27014143832` |
| doTrackLog   | Optional  | true      | If true, will pipe logs from console.log() to saasly                                                                                                                                                                                                                                                                                   |
| doTrackError | Optional  | true      | If true, will pipe logs from console.error() to saasly                                                                                                                                                                                                                                                                                 |
| doTrackWarn  | Optional  | true      | If true, will pipe logs from console.warn() to saasly                                                                                                                                                                                                                                                                                  |
| doTrackInfo  | Optional  | true      | If true, will pipe logs from console.info() to saasly                                                                                                                                                                                                                                                                                  |
| doTrackDebug | Optional  | true      | If true, will pipe logs from console.debug() to saasly                                                                                                                                                                                                                                                                                 |

https://client.saasly.io

### Why use saasly logs?

- **Centralized logging**: All of your logs are stored in one central location, making it easy to search and browse
  them.
- **Live logs**: You can see live logs from all of your Node.js applications in real time without having to connect to
  servers.
- **Historical logs**: You can also store and browse historical logs, making it easy to troubleshoot problems and track
  down errors.
- **Filtering and searching**: Saasly logging services allow you to filter and search your logs by level, source, and
  other criteria.
- **FREE** 😍
