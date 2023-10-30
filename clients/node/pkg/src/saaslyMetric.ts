import pushMetric from "./helper/metric/pushMetric";

export default function saaslyMetric({
  apiKey,
  source,
  variable,
  value,
  at,
}: {
  apiKey: string;
  source: string;
  variable: string;
  value: number;
  at?: string;
}) {
  pushMetric({
    apiKey,
    data: {
      source,
      variable,
      value,
      at,
    },
  });
}
