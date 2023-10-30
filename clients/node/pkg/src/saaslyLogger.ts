import prepareLog from "./helper/log/prepareLog";

export default async function saaslyLogger({
  apiKey,
  source,
  identifier,
  doTrackLog,
  doTrackError,
  doTrackWarn,
  doTrackInfo,
  doTrackDebug,
}: {
  apiKey: string;
  source?: string;
  identifier?: string;
  doTrackLog?: boolean;
  doTrackError?: boolean;
  doTrackWarn?: boolean;
  doTrackInfo?: boolean;
  doTrackDebug?: boolean;
}) {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleInfo = console.info;
  const originalConsoleWarn = console.warn;
  const originalConsoleDebug = console.debug;

  doTrackLog = typeof doTrackLog === "boolean" ? doTrackLog : true;
  doTrackError = typeof doTrackError === "boolean" ? doTrackError : true;
  doTrackWarn = typeof doTrackWarn === "boolean" ? doTrackWarn : true;
  doTrackInfo = typeof doTrackInfo === "boolean" ? doTrackInfo : true;
  doTrackDebug = typeof doTrackDebug === "boolean" ? doTrackDebug : true;

  let getMessage = (args: any[]) =>
    args
      .map((x) => {
        if (typeof x !== "string") {
          try {
            x = JSON.stringify(x);
          } catch (e) {}
        }
        return x;
      })
      .join(" ");

  if (doTrackLog) {
    console.log = function (...args: any[]) {
      originalConsoleLog.apply(console, args);
      const message = getMessage(args);
      let _identifier = identifier || message.match(/(^#\d+)/)?.[0] || "";
      prepareLog({
        apiKey,
        source,
        identifier: _identifier,
        level: "log",
        message,
      });
    };
  }
  if (doTrackError) {
    console.error = function (...args: any[]) {
      originalConsoleError.apply(console, args);
      const message = getMessage(args);
      let _identifier = identifier || message.match(/(^#\d+)/)?.[0] || "";
      prepareLog({
        apiKey,
        source,
        identifier: _identifier,
        level: "error",
        message,
      });
    };
  }
  if (doTrackWarn) {
    console.warn = function (...args: any[]) {
      originalConsoleWarn.apply(console, args);
      const message = getMessage(args);
      let _identifier = identifier || message.match(/(^#\d+)/)?.[0] || "";
      prepareLog({
        apiKey,
        source,
        identifier: _identifier,
        level: "warn",
        message,
      });
    };
  }
  if (doTrackDebug) {
    console.debug = function (...args: any[]) {
      originalConsoleDebug.apply(console, args);
      const message = getMessage(args);
      let _identifier = identifier || message.match(/(^#\d+)/)?.[0] || "";
      prepareLog({
        apiKey,
        source,
        identifier: _identifier,
        level: "debug",
        message,
      });
    };
  }
  if (doTrackInfo) {
    console.info = function (...args: any[]) {
      originalConsoleInfo.apply(console, args);
      const message = getMessage(args);
      let _identifier = identifier || message.match(/(^#\d+)/)?.[0] || "";
      prepareLog({
        apiKey,
        source,
        identifier: _identifier,
        level: "info",
        message,
      });
    };
  }

  let exceptionListener = async (err: any) => {
    if (err.isHandledBySaaslyLogger !== true) {
      let _identifier = identifier || err.message.match(/(^#\d+)/)?.[0] || "";

      await prepareLog({
        apiKey,
        source,
        identifier: _identifier,
        level: "error",
        message: `Uncaught Exception: ${err.message}`,
        stack: err.stack,
      });
      err.isHandledBySaaslyLogger = true;
      throw err;
    }
  };

  process.on("uncaughtException", exceptionListener);
}
