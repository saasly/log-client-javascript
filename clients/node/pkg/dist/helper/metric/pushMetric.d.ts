export default function pushMetric({ apiKey, data, }: {
    apiKey: string;
    data: {
        source: string;
        variable: string;
        value: number;
        at?: string;
    };
}): void;
