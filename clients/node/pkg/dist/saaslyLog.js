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
const axios_1 = require("axios");
let axiosRequestInProgress = false;
let pendingLogs = [];
let _apiKey = "";
function pushLogsToApi({ retryCount }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (_apiKey && (pendingLogs === null || pendingLogs === void 0 ? void 0 : pendingLogs[0])) {
            let sending = pendingLogs.splice(0);
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://api-v3.saasly.io/private/log/insert-batch",
                headers: {
                    "x-api-key": _apiKey,
                    "Content-Type": "application/json",
                },
                data: sending,
            };
            axiosRequestInProgress = true;
            yield axios_1.default
                .request(config)
                .then(() => {
                axiosRequestInProgress = false;
            })
                .catch((error) => {
                axiosRequestInProgress = false;
            });
        }
    });
}
function saaslyLog({ apiKey, data, }) {
    return __awaiter(this, void 0, void 0, function* () {
        _apiKey = apiKey;
        data.at = data.at || new Date().toISOString();
        if (data.at.slice(-1) === "Z") {
            data.at = data.at.slice(0, -1);
        }
        pendingLogs.push(data);
    });
}
exports.default = saaslyLog;
setInterval(pushLogsToApi, 2000);
process.on("SIGINT", () => {
    if (axiosRequestInProgress) {
        let timeoutId;
        let intervalId;
        intervalId = setInterval(() => {
            if (!axiosRequestInProgress) {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
                process.exit(0);
            }
        }, 100);
        // Set a timeout to force exit after 10 seconds.
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            process.exit(0);
        }, 10000);
    }
    else {
        process.exit(0);
    }
});
