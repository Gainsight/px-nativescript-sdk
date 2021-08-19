import { Common, JsonMap, GlobalContextMap } from './gainsight-px-bridge.common';
import { GainsightPXUser, GainsightPXAccount, GainsightPXConfiguration } from '.';
import { GainsightPXCallback } from './index';
export declare class Gainsight extends Common {
    static ios: GainsightPX;
    static android: any;
    private static successCallBack;
    static initialize(configs: GainsightPXConfiguration): Promise<GainsightPXCallback>;
    static custom(event: string): Promise<GainsightPXCallback>;
    static customEventWithProperties(event: string, properties?: JsonMap): Promise<GainsightPXCallback>;
    static screenWithTitle(name: string): Promise<GainsightPXCallback>;
    static screen(name: string, properties?: JsonMap): Promise<GainsightPXCallback>;
    static screenEvent(name: string, className: string, properties?: JsonMap): Promise<GainsightPXCallback>;
    static identifyUserId(userId: string): Promise<GainsightPXCallback>;
    static identifyUser(user: GainsightPXUser): Promise<GainsightPXCallback>;
    static identify(pxuser: GainsightPXUser, pxaccount?: GainsightPXAccount): Promise<GainsightPXCallback>;
    static setGlobalContext(contextJSON?: GlobalContextMap): void;
    static hasGlobalContextKey(key: string): boolean;
    static removeGlobalContextKeys(keys: string[]): void;
    static flush(): Promise<GainsightPXCallback>;
    static enable(): void;
    static disable(): void;
    static enterEditing(url: string): Promise<GainsightPXCallback>;
    static exitEditing(): Promise<GainsightPXCallback>;
    static gainsightpx(): GainsightPX;
    static _convertProperties(properties: any): NSDictionary<string, any>;
    static _dictionaryOfData(data?: any): NSDictionary<any, any>;
    static resultCallBack(functionName: string, properties: NSDictionary<string, any>, error: NSError): GainsightPXCallback;
}
