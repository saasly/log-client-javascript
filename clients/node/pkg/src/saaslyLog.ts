import axios from "axios";

let axiosRequestInProgress = false;

let pendingLogs: any[] = [];
let _apiKey = "";

async function pushLogsToApi({ retryCount }: { retryCount: number }) {
  if (_apiKey && pendingLogs?.[0]) {
    let sending: any = pendingLogs.splice(0);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api-v3.saasly.io/private/log/insert-batch",
      headers: {
        "x-api-key": _apiKey,
        "Content-Type": "application/json",
      },
      data: sending,
    };

    axiosRequestInProgress = true;

    await axios
      .request(config)
      .then(() => {
        axiosRequestInProgress = false;
      })
      .catch((error: any) => {
        axiosRequestInProgress = false;
      });
  }
}

export default async function saaslyLog({
  apiKey,
  data,
}: {
  apiKey: string;
  data: any;
}) {
  _apiKey = apiKey;
  data.at = data.at || new Date().toISOString();

  if (data.at.slice(-1) === "Z") {
    data.at = data.at.slice(0, -1);
  }

  pendingLogs.push(data);
}

setInterval(pushLogsToApi, 2000);

process.on("SIGINT", () => {
  if (axiosRequestInProgress) {
    let timeoutId: any;
    let intervalId: any;

    intervalId = setInterval(() => {
      if (!axiosRequestInProgress) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        process.exit(0);
      }
    }, 100);

    // Set a timeout to force exit after 10 seconds.
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      process.exit(0);
    }, 10000);
  } else {
    process.exit(0);
  }
});
