import { Observable } from 'tns-core-modules/data/observable';
export declare type JsonValue = boolean | number | string | null | JsonList | JsonMap;
export declare type GlobalContextValue = boolean | number | string | null | Date;
export interface GlobalContextMap {
    [key: string]: GlobalContextValue;
}
export interface JsonMap {
    [key: string]: JsonValue;
    [index: number]: JsonValue;
}
export interface JsonList extends Array<JsonValue> {
}
export declare class Common extends Observable {
}
export declare class Utils {
}
export declare enum GainsightPXCallbackStatus {
    FAILURE = 0,
    SUCCESS = 1
}
