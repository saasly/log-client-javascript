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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./log");
function saaslyLogger(_a) {
    var apiKey = _a.apiKey, source = _a.source, identifier = _a.identifier, doTrackLog = _a.doTrackLog, doTrackError = _a.doTrackError, doTrackWarn = _a.doTrackWarn, doTrackInfo = _a.doTrackInfo, doTrackDebug = _a.doTrackDebug;
    return __awaiter(this, void 0, void 0, function () {
        var originalConsoleLog, originalConsoleError, originalConsoleInfo, originalConsoleWarn, originalConsoleDebug, getMessage, exceptionListener;
        var _this = this;
        return __generator(this, function (_b) {
            originalConsoleLog = console.log;
            originalConsoleError = console.error;
            originalConsoleInfo = console.info;
            originalConsoleWarn = console.warn;
            originalConsoleDebug = console.debug;
            doTrackLog = typeof doTrackLog === "boolean" ? doTrackLog : true;
            doTrackError = typeof doTrackError === "boolean" ? doTrackError : true;
            doTrackWarn = typeof doTrackWarn === "boolean" ? doTrackWarn : true;
            doTrackInfo = typeof doTrackInfo === "boolean" ? doTrackInfo : true;
            doTrackDebug = typeof doTrackDebug === "boolean" ? doTrackDebug : true;
            getMessage = function (args) {
                return args.join(" ").replace(/(\r\n|\r|\n|  )/g, " ");
            };
            if (doTrackLog) {
                console.log = function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    originalConsoleLog.apply(console, args);
                    var message = getMessage(args);
                    var _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                    (0, log_1.default)({
                        apiKey: apiKey,
                        source: source,
                        identifier: _identifier,
                        level: "log",
                        message: message,
                    });
                };
            }
            if (doTrackError) {
                console.error = function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    originalConsoleError.apply(console, args);
                    var message = getMessage(args);
                    var _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                    (0, log_1.default)({
                        apiKey: apiKey,
                        source: source,
                        identifier: _identifier,
                        level: "error",
                        message: message,
                    });
                };
            }
            if (doTrackWarn) {
                console.warn = function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    originalConsoleWarn.apply(console, args);
                    var message = getMessage(args);
                    var _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                    (0, log_1.default)({
                        apiKey: apiKey,
                        source: source,
                        identifier: _identifier,
                        level: "warn",
                        message: message,
                    });
                };
            }
            if (doTrackDebug) {
                console.debug = function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    originalConsoleDebug.apply(console, args);
                    var message = getMessage(args);
                    var _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                    (0, log_1.default)({
                        apiKey: apiKey,
                        source: source,
                        identifier: _identifier,
                        level: "debug",
                        message: message,
                    });
                };
            }
            if (doTrackInfo) {
                console.info = function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    originalConsoleInfo.apply(console, args);
                    var message = getMessage(args);
                    var _identifier = identifier || ((_a = message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                    (0, log_1.default)({
                        apiKey: apiKey,
                        source: source,
                        identifier: _identifier,
                        level: "info",
                        message: message,
                    });
                };
            }
            exceptionListener = function (err) { return __awaiter(_this, void 0, void 0, function () {
                var _identifier;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _identifier = identifier || ((_a = err.message.match(/(^#\d+)/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
                            return [4 /*yield*/, (0, log_1.default)({
                                    apiKey: apiKey,
                                    source: source,
                                    identifier: _identifier,
                                    level: "error",
                                    message: "Uncaught Exception: ".concat(err.message),
                                    stack: err.stack,
                                })];
                        case 1:
                            _b.sent();
                            process.removeListener("uncaughtException", exceptionListener);
                            setTimeout(function () {
                                // in case if some other part handled exception and continued the app, which should not be the case but people do things.
                                process.on("uncaughtException", exceptionListener);
                            }, 1);
                            throw err;
                    }
                });
            }); };
            process.on("uncaughtException", exceptionListener);
            return [2 /*return*/];
        });
    });
}
exports.default = saaslyLogger;
