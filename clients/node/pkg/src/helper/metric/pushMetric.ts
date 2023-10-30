import axios from "axios";

let axiosRequestInProgress: Promise<any> | null = null;

let pendingMetrics: any[] = [];
let _apiKey = "";
let interval: any = null;

async function pushMetricsToApi() {
  if (_apiKey && pendingMetrics?.[0]) {
    let sending: any = pendingMetrics.splice(0);

    let config = {
      method: "post",
      timeout: 30000,
      maxBodyLength: Infinity,
      url: "https://api-v3.saasly.io/private/metric/insert-batch",
      headers: {
        "x-api-key": _apiKey,
        "Content-Type": "application/json",
      },
      data: {
        metrics: sending,
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

export default function pushMetric({
  apiKey,
  data,
}: {
  apiKey: string;
  data: {
    source: string;
    variable: string;
    value: number;
    at?: string;
  };
}) {
  _apiKey = apiKey;
  data.at = data.at || new Date().toISOString();

  if (data.at.slice(-1) === "Z") {
    data.at = data.at.slice(0, -1);
  }

  pendingMetrics.push(data);
  if (!interval) {
    interval = setTimeout(pushMetricsToApi, 2000);
  }
}

process.on("SIGINT", async () => {
  if (interval) {
    clearInterval(interval);
  }
  pushMetricsToApi();
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
