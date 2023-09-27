import axios from "axios";

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

  // todo batch
  // todo handle ctrl+c or general exit

  let response = await axios
    .request(config)
    .then((response) => {})
    .catch((error: any) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.error("269101142212 Error status:", error.response.status);
        // console.error("269101142218 Error response:", error.response.data);
        // console.error(
        //   "269101142218 Error response error:",
        //   error.response.data?.error,
        // );
      } else if (error.request) {
        // The request was made but no response was received
        // console.error("269101142223 No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.error("269101142227 Error message:", error.message);
      }
      if (_retryCount < maxRetries) {
        setTimeout(() => {
          saaslyLog({ apiKey, data, retryCount: _retryCount + 1 });
        }, retryDelay);
      }
    });
}
