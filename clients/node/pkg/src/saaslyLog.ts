import axios from "axios";

let axiosRequestInProgress = false;

export default async function saaslyLog({
  apiKey,
  data,
  retryCount,
}: {
  apiKey: string;
  data: any;
  retryCount?: number;
}) {
  let _retryCount = (retryCount || 0) as number;
  const maxRetries = 15;
  const retryDelay = 5000;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-v3.saasly.io/private/log/insert",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    data,
  };

  // todo batching

  axiosRequestInProgress = true;

  await axios
    .request(config)
    .then(() => {
      axiosRequestInProgress = false;
    })
    .catch((error: any) => {
      axiosRequestInProgress = false;
      if (_retryCount < maxRetries) {
        setTimeout(() => {
          saaslyLog({ apiKey, data, retryCount: _retryCount + 1 });
        }, retryDelay);
      }
    });
}

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
