export default function log({ apiKey, source, level, identifier, message, stack, }: {
    apiKey: string;
    source?: string;
    identifier?: string;
    level: "info" | "error" | "warn" | "debug" | "log" | "uncaughtException" | "unhandledRejection";
    message?: string;
    stack?: string;
}): Promise<void>;
