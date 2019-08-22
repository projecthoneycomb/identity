"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const applicationinsights_1 = require("applicationinsights");
function start() {
    // Automagically pulls the creds from env (APPINSIGHTS_INSTRUMENTATIONKEY)
    applicationinsights_1.setup().start()
        .setSendLiveMetrics(true);
}
exports.start = start;
//# sourceMappingURL=logging.js.map