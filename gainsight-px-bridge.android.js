"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gainsight_px_bridge_common_1 = require("./gainsight-px-bridge.common");
var app = require("tns-core-modules/application");
var logDebug = false;
var Gainsight = (function (_super) {
    __extends(Gainsight, _super);
    function Gainsight() {
        return _super.call(this) || this;
    }
    Gainsight.initialize = function (configs) {
        var gainsightPXCallback = {
            status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS
        };
        var key = configs.apiKey;
        if (logDebug) {
            console.log("initialize-start");
        }
        var context = app.android.foregroundActivity;
        if (null == context) {
            if (logDebug) {
                console.log("initialize-foreground activity context was null");
            }
            context = app.android.startActivity;
            if (null == context) {
                if (logDebug) {
                    console.log("initialize-start activity context was null, using app context");
                }
                context = app.android.context;
            }
            else {
                if (logDebug) {
                    console.log("initialize-got start activity context");
                }
            }
        }
        else {
            if (logDebug) {
                console.log("initialize-got foreground context");
            }
        }
        var instanceBuilder = null;
        try {
            instanceBuilder = new com.gainsight.px.mobile.GainsightPX.Builder(context, key, new com.gainsight.px.mobile.GainsightPX.ExceptionHandler({
                onExceptionOccurred: function (methodName, params, exceptionMessage) {
                    gainsightPXCallback = _onExceptionOccurred("initialize", params, exceptionMessage);
                }
            }));
        }
        catch (e) {
            if (logDebug) {
                console.log("Exception during instance creation: " + e.message);
            }
            throw e;
        }
        if (logDebug) {
            console.log("initialize-builder instance created");
        }
        if (configs.trackApplicationLifeCycleEvents !== undefined) {
            if (logDebug) {
                console.log("trackApplicationLifeCycleEvents: " + configs.trackApplicationLifeCycleEvents);
            }
            instanceBuilder.trackApplicationLifecycleEvents(configs.trackApplicationLifeCycleEvents);
        }
        if (configs.shouldTrackTapEvents !== undefined) {
            if (logDebug) {
                console.log("shouldTrackTapEvents: " + configs.shouldTrackTapEvents);
            }
            instanceBuilder.shouldTrackTapEvents(configs.shouldTrackTapEvents);
        }
        instanceBuilder.recordScreenViews(false);
        if (configs.collectDeviceId !== undefined) {
            if (logDebug) {
                console.log("collectDeviceId: " + configs.collectDeviceId);
            }
            instanceBuilder.collectDeviceId(configs.collectDeviceId);
        }
        if (configs.enableLogs !== undefined) {
            if (logDebug) {
                console.log("enableLogs: " + configs.enableLogs);
            }
            if (configs.enableLogs) {
                instanceBuilder.logLevel(com.gainsight.px.mobile.LogLevel.VERBOSE);
            }
            else {
                instanceBuilder.logLevel(com.gainsight.px.mobile.LogLevel.NONE);
            }
        }
        if ((configs.flushQueueSize !== undefined) && (configs.flushQueueSize > 0)) {
            if (logDebug) {
                console.log("flushQueueSize: " + configs.flushQueueSize);
            }
            instanceBuilder.flushQueueSize(configs.flushQueueSize);
        }
        if ((configs.flushInterval !== undefined) && (configs.flushInterval > 0)) {
            if (logDebug) {
                console.log("flushInterval: " + configs.flushInterval);
            }
            instanceBuilder.flushInterval(configs.flushInterval, java.util.concurrent.TimeUnit.SECONDS);
        }
        if (configs.proxy !== undefined) {
            if (logDebug) {
                console.log("proxy: " + configs.proxy);
            }
            instanceBuilder.proxy(configs.proxy);
        }
        else if (configs.host !== undefined) {
            if (configs.host === "us") {
                instanceBuilder.pxHost(com.gainsight.px.mobile.GainsightPX.PXHost.US);
            }
            else if (configs.host === "eu") {
                instanceBuilder.pxHost(com.gainsight.px.mobile.GainsightPX.PXHost.EU);
            }
        }
        var instanceAlreadySet = false;
        var instance = null;
        try {
            if (logDebug) {
                console.log("creating GainsightPX instance");
            }
            instance = instanceBuilder.build();
        }
        catch (e) {
            if (logDebug) {
                console.log("Exception during instance creation: " + e.message);
            }
            if (!e.message.includes("Duplicate gainsightPX client created with tag")) {
                throw e;
            }
            else {
                instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
                instanceAlreadySet = true;
            }
        }
        if (configs.enable !== undefined) {
            if (logDebug) {
                console.log("enable: " + configs.enable);
            }
            instance.setEnable(configs.enable);
        }
        if (!instanceAlreadySet) {
            try {
                if (logDebug) {
                    console.log("setting instance as singleton");
                }
                com.gainsight.px.mobile.GainsightPX.setSingletonInstance(instance);
            }
            catch (e) {
                if (logDebug) {
                    console.log("Exception during setting instance as singleton: " + e.message);
                }
                if (!e.message.includes("Singleton instance already exists.")) {
                    throw e;
                }
            }
        }
        if (gainsightPXCallback.status === gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE) {
            return Promise.reject(gainsightPXCallback);
        }
        return Promise.resolve(gainsightPXCallback);
    };
    Gainsight.custom = function (event) {
        return Gainsight.customEventWithProperties(event, null);
    };
    Gainsight.customEventWithProperties = function (event, properties) {
        var gainsightPXCallback = {
            status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS
        };
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        var nativeProp = Gainsight._convertToMap(properties);
        instance.custom(event, nativeProp, new com.gainsight.px.mobile.GainsightPX.ExceptionHandler({
            onExceptionOccurred: function (methodName, params, exceptionMessage) {
                gainsightPXCallback = _onExceptionOccurred("customEventWithProperties", params, exceptionMessage);
            }
        }));
        if (gainsightPXCallback.status === gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE) {
            return Promise.reject(gainsightPXCallback);
        }
        return Promise.resolve(gainsightPXCallback);
    };
    Gainsight.screenWithTitle = function (name) {
        return Gainsight._screenEvent(name, undefined, undefined, "screenWithTitle");
    };
    Gainsight.screen = function (name, properties) {
        return Gainsight._screenEvent(name, undefined, properties, "screen");
    };
    Gainsight.screenEvent = function (name, className, properties) {
        return Gainsight._screenEvent(name, className, properties, "screenEvent");
    };
    Gainsight._screenEvent = function (name, className, properties, _methodName) {
        var gainsightPXCallback = {
            status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS
        };
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        var eventData = new com.gainsight.px.mobile.ScreenEventData(name);
        if (className !== undefined) {
            eventData.putScreenClass(className);
        }
        if (properties !== undefined) {
            eventData.putProperties(Gainsight._convertToMap(properties));
        }
        instance.screen(eventData, new com.gainsight.px.mobile.GainsightPX.ExceptionHandler({
            onExceptionOccurred: function (methodName, params, exceptionMessage) {
                gainsightPXCallback = _onExceptionOccurred(_methodName, params, exceptionMessage);
            }
        }));
        if (gainsightPXCallback.status === gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE) {
            return Promise.reject(gainsightPXCallback);
        }
        return Promise.resolve(gainsightPXCallback);
    };
    Gainsight.identifyUserId = function (userId) {
        var user = {
            ide: userId
        };
        return Gainsight._identify(user, undefined, "identifyUserId");
    };
    Gainsight.identifyUser = function (user) {
        return Gainsight._identify(user, undefined, "identifyUser");
    };
    Gainsight.identify = function (user, account) {
        return Gainsight._identify(user, account, "identifyUser");
    };
    Gainsight._identify = function (user, account, _methodName) {
        var gainsightPXCallback = {
            status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS
        };
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        if (user !== undefined) {
            var nativeUser = new com.gainsight.px.mobile.User(user.ide);
            if (user.firstName !== undefined) {
                nativeUser.putFirstName(user.firstName);
            }
            if (user.lastName !== undefined) {
                nativeUser.putLastName(user.lastName);
            }
            if (user.title !== undefined) {
                nativeUser.putTitle(user.title);
            }
            if (user.role !== undefined) {
                nativeUser.putRole(user.role);
            }
            if (user.gender !== undefined) {
                nativeUser.putGender(com.gainsight.px.mobile.User.Gender.getGender(user.gender));
            }
            if (user.signUpDate !== undefined) {
                nativeUser.putSignUpDate(Gainsight._convertDateToLong(user.signUpDate));
            }
            if (user.subscriptionId !== undefined) {
                nativeUser.putSubscriptionId(user.subscriptionId);
            }
            if (user.phone !== undefined) {
                nativeUser.putPhone(user.phone);
            }
            if (user.email !== undefined) {
                nativeUser.putEmail(user.email);
            }
            if (user.accountId !== undefined) {
                nativeUser.putAccountId(user.accountId);
            }
            if (user.firstVisitDate !== undefined) {
                nativeUser.putFirstVisitDate(Gainsight._convertDateToLong(user.firstVisitDate));
            }
            if (user.score !== undefined) {
                nativeUser.putScore(user.score);
            }
            if (user.sfdcContactId !== undefined) {
                nativeUser.putSfdcContactId(user.sfdcContactId);
            }
            if (user.countryName !== undefined) {
                nativeUser.putCountryName(user.countryName);
            }
            if (user.countryCode !== undefined) {
                nativeUser.putCountryCode(user.countryCode);
            }
            if (user.stateName !== undefined) {
                nativeUser.putStateName(user.stateName);
            }
            if (user.stateCode !== undefined) {
                nativeUser.putStateCode(user.stateCode);
            }
            if (user.city !== undefined) {
                nativeUser.putCity(user.city);
            }
            if (user.street !== undefined) {
                nativeUser.putStreet(user.street);
            }
            if (user.continent !== undefined) {
                nativeUser.putContinentCode(user.continent);
            }
            if (user.postalCode !== undefined) {
                nativeUser.putPostalCode(user.postalCode);
            }
            if (user.regionName !== undefined) {
                nativeUser.putRegionName(user.regionName);
            }
            if (user.timezone !== undefined) {
                nativeUser.putTimeZone(user.timezone);
            }
            if (user.latitude !== undefined) {
                nativeUser.putLatitude(user.latitude);
            }
            if (user.longitude !== undefined) {
                nativeUser.putLongitude(user.longitude);
            }
            if (user.organization !== undefined) {
                nativeUser.putOrganizationName(user.organization);
            }
            if (user.organizationEmployees !== undefined) {
                nativeUser.putOrganizationEmployees(user.organizationEmployees);
            }
            if (user.organizationRevenue !== undefined) {
                nativeUser.putOrganizationRevenue(user.organizationRevenue);
            }
            if (user.organizationIndustry !== undefined) {
                nativeUser.putOrganizationIndustry(user.organizationIndustry);
            }
            if (user.organizationSicCode !== undefined) {
                nativeUser.putOrganizationSicCode(user.organizationSicCode);
            }
            if (user.organizationDuns !== undefined) {
                nativeUser.putOrganizationDuns(user.organizationDuns);
            }
            if (user.customAttributes !== undefined) {
                nativeUser.putCustomAttributes(Gainsight._convertToMap(user.customAttributes));
            }
            var nativeAccount = undefined;
            if (account !== undefined) {
                nativeAccount = new com.gainsight.px.mobile.Account(account.id);
                if (account.name !== undefined) {
                    nativeAccount.putName(account.name);
                }
                if (account.trackedSubscriptionId !== undefined) {
                    nativeAccount.putSubscriptionId(account.trackedSubscriptionId);
                }
                if (account.industry !== undefined) {
                    nativeAccount.putIndustry(account.industry);
                }
                if (account.numberOfEmployees !== undefined) {
                    nativeAccount.putEmployees(account.numberOfEmployees);
                }
                if (account.sicCode !== undefined) {
                    nativeAccount.putSicCode(account.sicCode);
                }
                if (account.naicsCode !== undefined) {
                    nativeAccount.putNaicsCode(account.naicsCode);
                }
                if (account.website !== undefined) {
                    nativeAccount.putWebsite(account.website);
                }
                if (account.plan !== undefined) {
                    nativeAccount.putPlan(account.plan);
                }
                if (account.sfdcId !== undefined) {
                    nativeAccount.putSfdcContactId(account.sfdcId);
                }
                if (account.countryCode !== undefined) {
                    nativeAccount.putCountryCode(account.countryCode);
                }
                if (account.countryName !== undefined) {
                    nativeAccount.putCountryName(account.countryName);
                }
                if (account.stateCode !== undefined) {
                    nativeAccount.putStateCode(account.stateCode);
                }
                if (account.stateName !== undefined) {
                    nativeAccount.putStateName(account.stateName);
                }
                if (account.city !== undefined) {
                    nativeAccount.putCity(account.city);
                }
                if (account.street !== undefined) {
                    nativeAccount.putStreet(account.street);
                }
                if (account.continent !== undefined) {
                    nativeAccount.putContinent(account.continent);
                }
                if (account.postalCode !== undefined) {
                    nativeAccount.putPostalCode(account.postalCode);
                }
                if (account.regionName !== undefined) {
                    nativeAccount.putRegionName(account.regionName);
                }
                if (account.timezone !== undefined) {
                    nativeAccount.putTimeZone(account.timezone);
                }
                if (account.latitude !== undefined) {
                    nativeAccount.putLatitude(account.latitude);
                }
                if (account.longitude !== undefined) {
                    nativeAccount.putLongitude(account.longitude);
                }
                if (account.customAttributes !== undefined) {
                    nativeAccount.putCustomAttributes(Gainsight._convertToMap(account.customAttributes));
                }
            }
            instance.identify(nativeUser, nativeAccount, new com.gainsight.px.mobile.GainsightPX.ExceptionHandler({
                onExceptionOccurred: function (methodName, params, exceptionMessage) {
                    gainsightPXCallback = _onExceptionOccurred(_methodName, params, exceptionMessage);
                }
            }));
        }
        if (gainsightPXCallback.status === gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE) {
            return Promise.reject(gainsightPXCallback);
        }
        return Promise.resolve(gainsightPXCallback);
    };
    Gainsight.flush = function () {
        var gainsightPXCallback = {
            status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS
        };
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        instance.flush(new com.gainsight.px.mobile.GainsightPX.ExceptionHandler({
            onExceptionOccurred: function (methodName, params, exceptionMessage) {
                gainsightPXCallback = _onExceptionOccurred(methodName, params, exceptionMessage);
            }
        }));
        if (gainsightPXCallback.status === gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE) {
            return Promise.reject(gainsightPXCallback);
        }
        return Promise.resolve(gainsightPXCallback);
    };
    Gainsight.enterEditing = function (url) {
        var gainsightPXCallback = {
            status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS
        };
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        var uri = android.net.Uri.parse(url);
        var intent = new android.content.Intent();
        intent.setData(uri);
        instance.enterEditingMode(intent);
        if (gainsightPXCallback.status === gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE) {
            return Promise.reject(gainsightPXCallback);
        }
        return Promise.resolve(gainsightPXCallback);
    };
    Gainsight.exitEditing = function () {
        var gainsightPXCallback = {
            status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.SUCCESS
        };
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        instance.exitEditingMode();
        if (gainsightPXCallback.status === gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE) {
            return Promise.reject(gainsightPXCallback);
        }
        return Promise.resolve(gainsightPXCallback);
    };
    Gainsight.enable = function () {
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        instance.setEnable(true);
    };
    Gainsight.disable = function () {
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        instance.setEnable(false);
    };
    Gainsight._convertDateToLong = function (date) {
        if (typeof (date) === "number") {
            return date;
        }
        else if (typeof (date) === "string") {
            try {
                var dateObj = new Date(date);
                return dateObj.getTime();
            }
            catch (e) {
            }
        }
        else if (date instanceof Date) {
            return date.getTime();
        }
        return 0;
    };
    Gainsight._convertToMap = function (json) {
        if (!json) {
            return null;
        }
        var map = new java.util.HashMap();
        for (var property in json) {
            if ((json.hasOwnProperty(property)) && (json[property] != null)) {
                switch (typeof json[property]) {
                    case 'object':
                        map.put(property, Gainsight._convertToMap(json[property]));
                        break;
                    case 'boolean':
                        map.put(property, java.lang.Boolean.valueOf(String(json[property])));
                        break;
                    case 'number':
                        if (Number(json[property]) === json[property] && json[property] % 1 === 0) {
                            map.put(property, java.lang.Long.valueOf(String(json[property])));
                        }
                        else {
                            map.put(property, java.lang.Double.valueOf(String(json[property])));
                        }
                        break;
                    case 'string':
                        map.put(property, String(json[property]));
                        break;
                }
            }
        }
        return map;
    };
    Gainsight.setGlobalContext = function (contextJSON) {
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        if (contextJSON == null) {
            instance.setGlobalContext(null);
            return;
        }
        var globalContextData;
        if (instance.getGlobalContext()) {
            globalContextData = instance.getGlobalContext();
        }
        else {
            globalContextData = new com.gainsight.px.mobile.GlobalContextData();
        }
        for (var key in contextJSON) {
            if (typeof contextJSON[key] === "number") {
                globalContextData.putNumber(key, contextJSON[key]);
            }
            else if (typeof contextJSON[key] === "string") {
                globalContextData.putString(key, contextJSON[key]);
            }
            else if (typeof contextJSON[key] === "boolean") {
                globalContextData.putBoolean(key, contextJSON[key]);
            }
        }
        instance.setGlobalContext(globalContextData);
    };
    Gainsight.hasGlobalContextKey = function (key) {
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        if (instance.getGlobalContext()) {
            var globalContextData = instance.getGlobalContext();
            return globalContextData.hasKey(key);
        }
        else {
            return false;
        }
    };
    Gainsight.removeGlobalContextKeys = function (keys) {
        var instance = com.gainsight.px.mobile.GainsightPX.with(app.android.context);
        if (instance.getGlobalContext()) {
            var globalContextData = instance.getGlobalContext();
            globalContextData.removeKey(keys);
        }
    };
    return Gainsight;
}(gainsight_px_bridge_common_1.Common));
exports.Gainsight = Gainsight;
function _onExceptionOccurred(methodName, params, exceptionMessage) {
    return {
        status: gainsight_px_bridge_common_1.GainsightPXCallbackStatus.FAILURE,
        methodName: methodName,
        params: params.toJsonObject(),
        exceptionMessage: exceptionMessage
    };
}
//# sourceMappingURL=gainsight-px-bridge.android.js.map