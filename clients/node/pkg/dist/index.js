"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
function saaslyLogger({ apiKey, source, identifier, doTrackLog, doTrackError, doTrackWarn, doTrackInfo, doTrackDebug, }) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let getMessage = (args) => args
            .map((x) => {
            if (typeof x !== "string") {
                x = JSON.stringify(x);
            }
            return x;
        })
            .join(" ");
        if (doTrackLog) {
            console.log = function (...args) {
                var _a;
                originalConsoleLog.apply(console, args);
                const message = getMessage(args);
                let _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                (0, log_1.default)({
                    apiKey,
                    source,
                    identifier: _identifier,
                    level: "log",
                    message,
                });
            };
        }
        if (doTrackError) {
            console.error = function (...args) {
                var _a;
                originalConsoleError.apply(console, args);
                const message = getMessage(args);
                let _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                (0, log_1.default)({
                    apiKey,
                    source,
                    identifier: _identifier,
                    level: "error",
                    message,
                });
            };
        }
        if (doTrackWarn) {
            console.warn = function (...args) {
                var _a;
                originalConsoleWarn.apply(console, args);
                const message = getMessage(args);
                let _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                (0, log_1.default)({
                    apiKey,
                    source,
                    identifier: _identifier,
                    level: "warn",
                    message,
                });
            };
        }
        if (doTrackDebug) {
            console.debug = function (...args) {
                var _a;
                originalConsoleDebug.apply(console, args);
                const message = getMessage(args);
                let _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                (0, log_1.default)({
                    apiKey,
                    source,
                    identifier: _identifier,
                    level: "debug",
                    message,
                });
            };
        }
        if (doTrackInfo) {
            console.info = function (...args) {
                var _a;
                originalConsoleInfo.apply(console, args);
                const message = getMessage(args);
                let _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                (0, log_1.default)({
                    apiKey,
                    source,
                    identifier: _identifier,
                    level: "info",
                    message,
                });
            };
        }
        let exceptionListener = (err) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let _identifier = identifier || ((_a = err.message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
            yield (0, log_1.default)({
                apiKey,
                source,
                identifier: _identifier,
                level: "error",
                message: `Uncaught Exception: ${err.message}`,
                stack: err.stack,
            });
            process.removeListener("uncaughtException", exceptionListener);
            setTimeout(() => {
                // in case if some other part handled exception and continued the app, which should not be the case but people do things.
                process.on("uncaughtException", exceptionListener);
            }, 1);
            throw err;
        });
        process.on("uncaughtException", exceptionListener);
    });
}
exports.default = saaslyLogger;
