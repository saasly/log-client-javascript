"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function saaslyLog({ apiKey, data, retryCount, }) {
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
    let response = await axios_1.default
        .request(config)
        .then((response) => { })
        .catch(() => {
        if (_retryCount < maxRetries) {
            setTimeout(() => {
                saaslyLog({ apiKey, data, retryCount: _retryCount + 1 });
            }, retryDelay);
        }
    });
    console.warn(`26993545158 response: `, response);
}
exports.default = saaslyLog;
