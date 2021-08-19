"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var Common = (function (_super) {
    __extends(Common, _super);
    function Common() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Common;
}(observable_1.Observable));
exports.Common = Common;
var Utils = (function () {
    function Utils() {
    }
    return Utils;
}());
exports.Utils = Utils;
var GainsightPXCallbackStatus;
(function (GainsightPXCallbackStatus) {
    GainsightPXCallbackStatus[GainsightPXCallbackStatus["FAILURE"] = 0] = "FAILURE";
    GainsightPXCallbackStatus[GainsightPXCallbackStatus["SUCCESS"] = 1] = "SUCCESS";
})(GainsightPXCallbackStatus = exports.GainsightPXCallbackStatus || (exports.GainsightPXCallbackStatus = {}));
//# sourceMappingURL=gainsight-px-bridge.common.js.map