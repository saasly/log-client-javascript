import getRootFilePath from "./getRootFilePath";
import getRootFileName from "./getRootFileName";
import { relative } from "path";
import saaslyLog from "./saaslyLog";

const stackTrace = require("stack-trace");

function getTrace() {
  let trace = stackTrace.get();
  let final: string[] = [];
  trace.forEach((t: any) => {
    if (
      t.isNative() === false &&
      t.isConstructor() === false &&
      t.getFileName() !== __filename
    ) {
      if (relative(__filename, t.getFileName()) !== "../index.js") {
        final.push(t.toString());
      }
    }
  });
  return final;
}

export default function log({
  apiKey,
  source,
  level,
  identifier,
  message,
  stack,
}: {
  apiKey: string;
  source?: string;
  identifier?: string;
  level:
    | "info"
    | "error"
    | "warn"
    | "debug"
    | "log"
    | "uncaughtException"
    | "unhandledRejection";
  message?: string;
  stack?: string;
}) {
  saaslyLog({
    apiKey,
    data: {
      at: new Date().toISOString(),
      source,
      level: level || "log",
      identifier: identifier || "",
      log: message || "no message",
      meta: {
        rootFilePath: getRootFilePath() || "",
        rootFile: getRootFileName(getRootFilePath()) || "",
        trace: getTrace() || [],
        pid: process.pid || -1,
      },
    },
  });
}
