import axios from "axios";

let axiosRequestInProgress: Promise<any> | null = null;

let pendingLogs: any[] = [];
let _apiKey = "";
let interval: any = null;

async function pushLogsToApi() {
  if (_apiKey && pendingLogs?.[0]) {
    let sending: any = pendingLogs.splice(0);

    let config = {
      method: "post",
      timeout: 30000,
      maxBodyLength: Infinity,
      url: "https://api-v3.saasly.io/private/log/insert-batch",
      headers: {
        "x-api-key": _apiKey,
        "Content-Type": "application/json",
      },
      data: {
        logs: sending,
      },
    };

    axiosRequestInProgress = axios
      .request(config)
      .then((_result) => {
        axiosRequestInProgress = null;
      })
      .catch((error: any) => {
        axiosRequestInProgress = null;
      });
  } else {
    if (interval) {
      clearInterval(interval);
    }
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
  if (!interval) {
    interval = setTimeout(pushLogsToApi, 2000);
  }
}

process.on("SIGINT", async () => {
  if (interval) {
    clearInterval(interval);
  }
  pushLogsToApi();
  if (axiosRequestInProgress) {
    let _timeout = setTimeout(() => {
      process.exit(0);
    }, 3000);
    await axiosRequestInProgress;
    if (_timeout) {
      clearTimeout(_timeout);
    }
  }

  process.exit(0);
});
