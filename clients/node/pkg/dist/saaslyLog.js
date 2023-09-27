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
function saaslyLog({ apiKey, data, retryCount, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let _retryCount = (retryCount || 0);
        const maxRetries = 15;
        const retryDelay = 5000;
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://api-v3.saasly.io/private/log/insert",
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json",
            },
            data,
        };
        // todo batching
        axiosRequestInProgress = true;
        yield axios_1.default
            .request(config)
            .then(() => {
            axiosRequestInProgress = false;
        })
            .catch((error) => {
            axiosRequestInProgress = false;
            if (_retryCount < maxRetries) {
                setTimeout(() => {
                    saaslyLog({ apiKey, data, retryCount: _retryCount + 1 });
                }, retryDelay);
            }
        });
    });
}
exports.default = saaslyLog;
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
