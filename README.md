This is Typescript / Javascript client for NodeJs.

All your logs will be sent to saasly.io logs. You will be able to search and browse your logs in one place.


### Usage

Just make sure to add this line as soon as possible in your code.

```typescript
import saaslyLogs from "@saasly/logs-client-nodejs";
// OR
const saaslyLogs = require("@saasly/logs-client-nodejs");

saaslyLogs({apiKey: "YOUR_API_KEY"})

// After this line continue using your regular `console.log`, `console.warn`, `console.error`, `console.info` functions.
```

### Get your free API key:

1. Login at https://client.saasly.io/
2. Create or join workspace
3. Get API key in settings view
