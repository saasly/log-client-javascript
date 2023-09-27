import log from "./src/log";

export default async function saaslyLogger({
  apiKey,
  source,
  identifier,
  doTrackLog,
  doTrackError,
  doTrackWarn,
  doTrackInfo,
}: {
  apiKey: string;
  source?: string;
  identifier?: string;
  doTrackLog?: boolean;
  doTrackError?: boolean;
  doTrackWarn?: boolean;
  doTrackInfo?: boolean;
}) {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleInfo = console.info;
  const originalConsoleWarn = console.warn;

  doTrackLog = typeof doTrackLog === "boolean" ? doTrackLog : true;
  doTrackError = typeof doTrackError === "boolean" ? doTrackError : true;
  doTrackWarn = typeof doTrackWarn === "boolean" ? doTrackWarn : true;
  doTrackInfo = typeof doTrackInfo === "boolean" ? doTrackInfo : true;

  let getMessage = (args: any[]) =>
    args.join(" ").replace(/(\r\n|\r|\n|  )/g, " ");

  if (doTrackLog) {
    console.log = function (...args: any[]) {
      originalConsoleLog.apply(console, args);
      const message = getMessage(args);
      identifier = identifier || message.match(/(^#\d+)/)?.[0] || "";
      log({
        apiKey,
        source,
        identifier,
        level: "log",
        message,
      });
    };
  }
}
