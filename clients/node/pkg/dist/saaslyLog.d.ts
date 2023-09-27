export default function saaslyLog({ apiKey, data, retryCount, }: {
    apiKey: string;
    data: any;
    retryCount?: number;
}): Promise<void>;
