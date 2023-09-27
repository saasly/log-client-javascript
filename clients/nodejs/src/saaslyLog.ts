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

  let response = await axios
    .request(config)
    .then((response) => {})
    .catch(() => {
      if (_retryCount < maxRetries) {
        setTimeout(() => {
          saaslyLog({ apiKey, data, retryCount: _retryCount + 1 });
        }, retryDelay);
      }
    });

  console.warn(`26993545158 response: `, response);
}
