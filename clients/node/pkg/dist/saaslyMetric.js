"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pushMetric_1 = require("./helper/metric/pushMetric");
function saaslyMetric({ apiKey, source, variable, value, at, }) {
    (0, pushMetric_1.default)({
        apiKey,
        data: {
            source,
            variable,
            value,
            at,
        },
    });
}
exports.default = saaslyMetric;
