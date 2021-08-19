import { Common, GlobalContextMap, JsonMap } from './gainsight-px-bridge.common';
import { GainsightPXAccount, GainsightPXCallback, GainsightPXConfiguration, GainsightPXUser } from './index';
export declare class Gainsight extends Common {
    constructor();
    static initialize(configs: GainsightPXConfiguration): Promise<GainsightPXCallback>;
    static custom(event: string): Promise<GainsightPXCallback>;
    static customEventWithProperties(event: string, properties?: JsonMap): Promise<GainsightPXCallback>;
    static screenWithTitle(name: string): Promise<GainsightPXCallback>;
    static screen(name: string, properties?: JsonMap): Promise<GainsightPXCallback>;
    static screenEvent(name: string, className: string, properties?: JsonMap): Promise<GainsightPXCallback>;
    private static _screenEvent;
    static identifyUserId(userId: string): Promise<GainsightPXCallback>;
    static identifyUser(user: GainsightPXUser): Promise<GainsightPXCallback>;
    static identify(user: GainsightPXUser, account?: GainsightPXAccount): Promise<GainsightPXCallback>;
    static _identify(user: GainsightPXUser, account?: GainsightPXAccount, _methodName?: string): Promise<GainsightPXCallback>;
    static flush(): Promise<GainsightPXCallback>;
    static enterEditing(url: string): Promise<GainsightPXCallback>;
    static exitEditing(): Promise<GainsightPXCallback>;
    static enable(): void;
    static disable(): void;
    private static _convertDateToLong;
    private static _convertToMap;
    static setGlobalContext(contextJSON?: GlobalContextMap): void;
    static hasGlobalContextKey(key: string): boolean;
    static removeGlobalContextKeys(keys: string[]): void;
}
