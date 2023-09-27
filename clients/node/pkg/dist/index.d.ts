export default function saaslyLogger({ apiKey, source, identifier, doTrackLog, doTrackError, doTrackWarn, doTrackInfo, doTrackDebug, }: {
    apiKey: string;
    source?: string;
    identifier?: string;
    doTrackLog?: boolean;
    doTrackError?: boolean;
    doTrackWarn?: boolean;
    doTrackInfo?: boolean;
    doTrackDebug?: boolean;
}): Promise<void>;
