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
let axiosRequestInProgress = null;
let pendingLogs = [];
let _apiKey = "";
let interval = null;
function pushLogsToApi() {
    return __awaiter(this, void 0, void 0, function* () {
        if (_apiKey && (pendingLogs === null || pendingLogs === void 0 ? void 0 : pendingLogs[0])) {
            let sending = pendingLogs.splice(0);
            let config = {
                method: "post",
                timeout: 30000,
                maxBodyLength: Infinity,
                url: "https://api-v3.saasly.io/private/log/insert-batch",
                headers: {
                    "x-api-key": _apiKey,
                    "Content-Type": "application/json",
                },
                data: {
                    logs: sending,
                },
            };
            axiosRequestInProgress = axios_1.default
                .request(config)
                .then((_result) => {
                axiosRequestInProgress = null;
            })
                .catch((error) => {
                axiosRequestInProgress = null;
            });
        }
        else {
            if (interval) {
                clearInterval(interval);
            }
        }
    });
}
function pushLog({ apiKey, data, }) {
    return __awaiter(this, void 0, void 0, function* () {
        _apiKey = apiKey;
        data.at = data.at || new Date().toISOString();
        if (data.at.slice(-1) === "Z") {
            data.at = data.at.slice(0, -1);
        }
        pendingLogs.push(data);
        if (!interval) {
            interval = setTimeout(pushLogsToApi, 2000);
        }
    });
}
exports.default = pushLog;
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    if (interval) {
        clearInterval(interval);
    }
    pushLogsToApi();
    if (axiosRequestInProgress) {
        let _timeout = setTimeout(() => {
            process.exit(0);
        }, 3000);
        yield axiosRequestInProgress;
        if (_timeout) {
            clearTimeout(_timeout);
        }
    }
    process.exit(0);
}));
