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
        while (_) try {
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
exports.__esModule = true;
exports.saaslyLog = void 0;
var axios_1 = require("axios");
var axiosRequestInProgress = false;
function _saaslyLog(_a) {
    var apiKey = _a.apiKey, data = _a.data, retryCount = _a.retryCount;
    return __awaiter(this, void 0, void 0, function () {
        var _retryCount, maxRetries, retryDelay, config;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _retryCount = (retryCount || 0);
                    maxRetries = 15;
                    retryDelay = 5000;
                    config = {
                        method: "post",
                        maxBodyLength: Infinity,
                        url: "https://api-v3.saasly.io/private/log/insert",
                        headers: {
                            "x-api-key": apiKey,
                            "Content-Type": "application/json"
                        },
                        data: data
                    };
                    // todo batching
                    axiosRequestInProgress = true;
                    return [4 /*yield*/, axios_1["default"]
                            .request(config)
                            .then(function () {
                            axiosRequestInProgress = false;
                        })["catch"](function (error) {
                            axiosRequestInProgress = false;
                            if (_retryCount < maxRetries) {
                                setTimeout(function () {
                                    _saaslyLog({ apiKey: apiKey, data: data, retryCount: _retryCount + 1 });
                                }, retryDelay);
                            }
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
process.on("SIGINT", function () {
    if (axiosRequestInProgress) {
        var timeoutId_1;
        var intervalId_1;
        intervalId_1 = setInterval(function () {
            if (!axiosRequestInProgress) {
                clearInterval(intervalId_1);
                clearTimeout(timeoutId_1);
                process.exit(0);
            }
        }, 100);
        // Set a timeout to force exit after 10 seconds.
        timeoutId_1 = setTimeout(function () {
            clearInterval(intervalId_1);
            process.exit(0);
        }, 10000);
    }
    else {
        process.exit(0);
    }
});
exports["default"] = _saaslyLog;
exports.saaslyLog = _saaslyLog;
module.exports = _saaslyLog;
