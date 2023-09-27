"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRootFilePath_1 = require("./getRootFilePath");
const getRootFileName_1 = require("./getRootFileName");
const path_1 = require("path");
const saaslyLog_1 = require("./saaslyLog");
const stack_trace_1 = require("stack-trace");
const os = require("os");
function getTrace() {
    let trace = (0, stack_trace_1.get)();
    let final = [];
    trace.forEach((t) => {
        if (t.isNative() === false &&
            t.isConstructor() === false &&
            t.getFileName() !== __filename) {
            if ((0, path_1.relative)(__filename, t.getFileName()) !== "../index.js") {
                final.push(t.toString());
            }
        }
    });
    return final;
}
function log({ apiKey, source, level, identifier, message, stack, }) {
    return (0, saaslyLog_1.default)({
        apiKey,
        data: {
            at: new Date().toISOString(),
            source,
            level: level || "log",
            identifier: identifier || "",
            log: message || "no message",
            meta: JSON.stringify({
                rootFilePath: (0, getRootFilePath_1.default)() || "",
                rootFile: (0, getRootFileName_1.default)((0, getRootFilePath_1.default)()) || "",
                trace: getTrace() || [],
                pid: process.pid || -1,
                nodeVersion: process.version,
                NODE_ENV: process.env.NODE_ENV || "",
                hostname: os.hostname(),
                os: `${os.type()} ${os.release()}`,
            }),
        },
    });
}
exports.default = log;
