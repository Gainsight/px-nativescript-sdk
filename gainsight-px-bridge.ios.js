"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gainsight_px_bridge_common_1 = require("./gainsight-px-bridge.common");
var TypeCheck = require("tns-core-modules/utils/types");
var GainsightPXMethod;
(function (GainsightPXMethod) {
    GainsightPXMethod["INITIALIZE"] = "initialize";
    GainsightPXMethod["CUSTOM"] = "custom";
    GainsightPXMethod["CUSTOM_EVENT_WITH_PROPERTIES"] = "customEventWithProperties";
    GainsightPXMethod["SCREEN_WITH_TITLE"] = "screenWithTitle";
    GainsightPXMethod["SCREEN"] = "screen";
    GainsightPXMethod["SCREEN_EVENT"] = "screenEvent";
    GainsightPXMethod["IDENTIFY_USER_ID"] = "identifyUserId";
    GainsightPXMethod["IDENTIFY_USER"] = "identifyUser";
    GainsightPXMethod["IDENTIFY"] = "identify";
    GainsightPXMethod["FLUSH"] = "flush";
    GainsightPXMethod["ENTEREDITING"] = "enterEditing";
    GainsightPXMethod["EXITEDITING"] = "exitEditing";
})(GainsightPXMethod || (GainsightPXMethod = {}));
var Gainsight = (function (_super) {
    __extends(Gainsight, _super);
    function Gainsight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gainsight.initialize = function (configs) {
        var _this = this;
        var configurations = PXAnalyticsConfigurations.alloc().initWithApiKey(configs.apiKey);
        if (configs.flushQueueSize !== undefined) {
            configurations.flushQueueSize = configs.flushQueueSize;
        }
        if (configs.flushInterval !== undefined) {
            configurations.flushInterval = configs.flushInterval;
        }
        if (configs.trackApplicationLifeCycleEvents !== undefined) {
            configurations.trackApplicationLifecycleEvents = configs.trackApplicationLifeCycleEvents;
        }
        if (configs.shouldTrackTapEvents !== undefined) {
            configurations.shouldTrackTapEvents = configs.shouldTrackTapEvents;
        }
        if (configs.proxy !== undefined) {
            var connection = PXConnection.alloc().initWithCustomHost(configs.proxy);
            configurations.connection = connection;
        }
        else if (configs.host != undefined) {
            var pxHost = void 0;
            if (configs.host == "us") {
                pxHost = 0;
            }
            else if (configs.host == "eu") {
                pxHost = 1;
            }
            var connection = PXConnection.alloc().initWithHost(pxHost);
            configurations.connection = connection;
        }
        configurations.recordScreenViews = false;
        if (configs.enableLogs !== undefined) {
            GainsightPX.debugLogsWithEnable(configs.enableLogs);
        }
        var callback = this.successCallBack;
        GainsightPX.sharedInstance().initialiseWithConfigurationsCompletionBlock(configurations, function (functionName, properties, error) {
            callback = _this.resultCallBack(functionName, properties, error);
        });
        callback.methodName = GainsightPXMethod.INITIALIZE;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.custom = function (event) {
        var _this = this;
        var callback = this.successCallBack;
        this.ios.customWithEventErrorCompletionBlock(event, function (functionName, properties, error) {
            callback = _this.resultCallBack(functionName, properties, error);
        });
        callback.methodName = GainsightPXMethod.CUSTOM;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.customEventWithProperties = function (event, properties) {
        var _this = this;
        var callback = this.successCallBack;
        this.ios.customWithEventPropertiesErrorCompletionBlock(event, this._convertProperties(properties), function (functionName, properties, error) {
            callback = _this.resultCallBack(functionName, properties, error);
        });
        callback.methodName = GainsightPXMethod.CUSTOM_EVENT_WITH_PROPERTIES;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.screenWithTitle = function (name) {
        var _this = this;
        var callback = this.successCallBack;
        this.ios.screenWithTitleErrorCompletionBlock(name, function (functionName, properties, error) {
            callback = _this.resultCallBack(functionName, properties, error);
        });
        callback.methodName = GainsightPXMethod.SCREEN_WITH_TITLE;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.screen = function (name, properties) {
        var _this = this;
        var callback = this.successCallBack;
        this.ios.screenWithTitlePropertiesErrorCompletionBlock(name, this._convertProperties(properties), function (functionName, properties, error) {
            callback = _this.resultCallBack(functionName, properties, error);
        });
        callback.methodName = GainsightPXMethod.SCREEN;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.screenEvent = function (name, className, properties) {
        var _this = this;
        var callback = this.successCallBack;
        var screenEvent = ScreenEvent.alloc().initWithScreenNameScreenClass(name, className);
        this.ios.screenWithScreenPropertiesErrorCompletionBlock(screenEvent, this._convertProperties(properties), function (functionName, properties, error) {
            callback = _this.resultCallBack(functionName, properties, error);
        });
        callback.methodName = GainsightPXMethod.SCREEN_EVENT;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.identifyUserId = function (userId) {
        var _this = this;
        var callback = this.successCallBack;
        this.ios.identifyWithUserIdErrorCompletionBlock(userId, function (functionName, properties, error) {
            callback = _this.resultCallBack(functionName, properties, error);
        });
        callback.methodName = GainsightPXMethod.IDENTIFY_USER_ID;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.identifyUser = function (user) {
        var callback = this.successCallBack;
        this.identify(user)
            .then(function (successCallback) {
            callback = successCallback;
        })
            .catch(function (failCallback) {
            callback = failCallback;
        });
        callback.methodName = GainsightPXMethod.IDENTIFY_USER;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.identify = function (pxuser, pxaccount) {
        var _this = this;
        var user = PXUser.alloc().initWithUserId(pxuser.ide);
        user.email = pxuser.email;
        user.userHash = pxuser.userHash;
        user.gender = pxuser.gender;
        user.lastName = pxuser.lastName;
        user.firstName = pxuser.firstName;
        user.signUpDate = pxuser.signUpDate;
        user.title = pxuser.title;
        user.role = pxuser.role;
        user.subscriptionId = pxuser.subscriptionId;
        user.phone = pxuser.phone;
        user.organization = pxuser.organization;
        user.organizationEmployees = pxuser.organizationEmployees;
        user.organizationRevenue = pxuser.organizationEmployees;
        user.organizationIndustry = pxuser.organizationIndustry;
        user.organizationSicCode = pxuser.organizationSicCode;
        user.organizationDuns = pxuser.organizationDuns;
        user.accountId = pxuser.accountId;
        user.firstVisitDate = pxuser.firstVisitDate;
        user.score = pxuser.score;
        user.sfdcContactId = pxuser.sfdcContactId;
        user.countryCode = pxuser.countryCode;
        user.countryName = pxuser.countryName;
        user.stateCode = pxuser.stateCode;
        user.stateName = pxuser.stateName;
        user.city = pxuser.city;
        user.street = pxuser.street;
        user.continent = pxuser.continent;
        user.postalCode = pxuser.postalCode;
        user.regionName = pxuser.regionName;
        user.timeZone = pxuser.timezone;
        user.latitude = pxuser.latitude;
        user.longitude = pxuser.longitude;
        user.customAttributes = this._convertProperties(pxuser.customAttributes);
        var callback = this.successCallBack;
        if (pxaccount != undefined) {
            var account = PXAccount.alloc().initWithId(pxaccount.id);
            account.name = pxaccount.name;
            account.trackedSubscriptionId = pxaccount.trackedSubscriptionId;
            account.industry = pxaccount.industry;
            account.numberOfEmployees = pxaccount.numberOfEmployees;
            account.sicCode = pxaccount.sicCode;
            account.website = pxaccount.website;
            account.naicsCode = pxaccount.naicsCode;
            account.plan = pxaccount.plan;
            account.sfdcId = pxaccount.sfdcId;
            account.countryCode = pxaccount.countryCode;
            account.countryName = pxaccount.countryName;
            account.stateCode = pxaccount.stateCode;
            account.stateName = pxaccount.stateName;
            account.city = pxaccount.city;
            account.street = pxaccount.street;
            account.continent = pxaccount.continent;
            account.postalCode = pxaccount.postalCode;
            account.regionName = pxaccount.regionName;
            account.timeZone = pxaccount.timezone;
            account.latitude = pxaccount.latitude;
            account.longitude = pxaccount.longitude;
            account.customAttributes = this._convertProperties(pxaccount.customAttributes);
            this.ios.identifyWithUserAccountErrorCompletionBlock(user, account, function (functionName, properties, error) {
                callback = _this.resultCallBack(functionName, properties, error);
            });
        }
        else {
            this.ios.identifyWithUserErrorCompletionBlock(user, function (functionName, properties, error) {
                callback = _this.resultCallBack(functionName, properties, error);
            });
        }
        callback.methodName = GainsightPXMethod.IDENTIFY;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.setGlobalContext = function (contextJSON) {
        if (contextJSON == null) {
            this.ios.globalContextWithContext(null);
            return;
        }
        if (this.ios.globalContext == undefined) {
            var context = new PXGlobalContext();
            this.ios.globalContextWithContext(context);
        }
        var keys = contextJSON.keys;
        for (var key in contextJSON) {
            var value = contextJSON[key];
            if (TypeCheck.isBoolean(value)) {
                var boolValue = Boolean(value);
                this.ios.globalContext.setBooleanWithKeyValue(key, boolValue);
            }
            else if (TypeCheck.isNumber(value)) {
                var number = Number(value);
                this.ios.globalContext.setDoubleWithKeyValue(key, number);
            }
            else if (TypeCheck.isString(value)) {
                var stringValue = String(value);
                this.ios.globalContext.setStringWithKeyValue(key, stringValue);
            }
            else if (value instanceof Date) {
                this.ios.globalContext.setDateWithKeyValue(key, value);
            }
        }
    };
    Gainsight.hasGlobalContextKey = function (key) {
        if (this.ios.globalContext == undefined) {
            return false;
        }
        return this.ios.globalContext.hasKeyWithKey(key);
    };
    Gainsight.removeGlobalContextKeys = function (keys) {
        if (this.ios.globalContext == undefined) {
            return;
        }
        this.ios.globalContext.removeKeysWithKeys(keys);
    };
    Gainsight.flush = function () {
        var _this = this;
        var callback = this.successCallBack;
        this.ios.flushWithErrorCompletionBlock(function (functionName, properties, error) {
            callback = _this.resultCallBack(functionName, properties, error);
        });
        callback.methodName = GainsightPXMethod.FLUSH;
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.enable = function () {
        GainsightPX.enable();
    };
    Gainsight.disable = function () {
        GainsightPX.disable();
    };
    Gainsight.enterEditing = function (url) {
        var callback = this.successCallBack;
        callback.methodName = GainsightPXMethod.ENTEREDITING;
        var editorURL = NSURL.URLWithString(url);
        if (editorURL != null) {
            this.ios.enterEditingModeWithUrl(editorURL);
        }
        else {
            callback.status = gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE;
        }
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.exitEditing = function () {
        var callback = this.successCallBack;
        callback.methodName = GainsightPXMethod.EXITEDITING;
        this.ios.exitEditingMode();
        return callback.status == gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS ? Promise.resolve(callback) : Promise.reject(callback);
    };
    Gainsight.gainsightpx = function () {
        return GainsightPX.sharedInstance();
    };
    Gainsight._convertProperties = function (properties) {
        if (!properties) {
            return null;
        }
        return this._dictionaryOfData(properties);
    };
    Gainsight._dictionaryOfData = function (data) {
        if (data) {
            var dict = NSMutableDictionary.dictionary();
            for (var key in data) {
                dict.setObjectForKey(data[key], key);
            }
            return dict;
        }
        return null;
    };
    Gainsight.resultCallBack = function (functionName, properties, error) {
        if (error == undefined) {
            return { status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS };
        }
        return { status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE,
            methodName: functionName,
            params: properties,
            exceptionMessage: error.localizedDescription };
    };
    Gainsight.ios = Gainsight.gainsightpx();
    Gainsight.android = null;
    Gainsight.successCallBack = { status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS };
    return Gainsight;
}(gainsight_px_bridge_common_1.Common));
exports.Gainsight = Gainsight;
//# sourceMappingURL=gainsight-px-bridge.ios.js.map