import {Common, JsonMap, GlobalContextMap, GainsightPXCallbackStatus} from './gainsight-px-bridge.common';

export declare class Gainsight extends Common {
  static initialize(configs: GainsightPXConfiguration): Promise<GainsightPXCallback>;
  static custom(event: string): Promise<GainsightPXCallback>;
  static screenWithTitle(name: string): Promise<GainsightPXCallback>;
  static screen(name: string, properties?: JsonMap): Promise<GainsightPXCallback>;
  static screenEvent(name: string, className: string, properties?: JsonMap): Promise<GainsightPXCallback>;
  static customEventWithProperties(event: string, properties?: JsonMap): Promise<GainsightPXCallback>;

  static identifyUserId(userId: String): Promise<GainsightPXCallback>;
  static identifyUser(user: GainsightPXUser): Promise<GainsightPXCallback>;
  static identify(user: GainsightPXUser, account?: GainsightPXAccount): Promise<GainsightPXCallback>;

  static setGlobalContext(contextJSON?: GlobalContextMap);
  static hasGlobalContextKey(key: string): boolean;
  static removeGlobalContextKeys(keys: string[]);

  static flush(): Promise<GainsightPXCallback>;
  static enable(): void;
  static disable(): void;

  static enterEditing(url: string): Promise<GainsightPXCallback>;
  static exitEditing(): Promise<GainsightPXCallback>;
}

export interface GainsightPXCallback {
  status: GainsightPXCallbackStatus;
  methodName?: string;
  params?: object;
  exceptionMessage?: string;
}

export interface GainsightPXConfiguration {
  apiKey: string;
  flushQueueSize?: number;
  flushInterval?: number;
  enableLogs?: boolean;
  trackApplicationLifeCycleEvents?: boolean;
  shouldTrackTapEvents?: boolean;
  enable?: boolean;
  collectDeviceId?: boolean;
  proxy?: string;
  host?: string;
}

export interface GainsightPXGeoDetails {
  countryCode?: string;
  countryName?: string;
  stateCode?: string;
  stateName?: string;
  city?: string;
  street?: string;
  continent?: string;
  postalCode?: string;
  regionName?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
}

export interface GainsightPXUser extends GainsightPXGeoDetails {
  ide: string;
  email?: string;
  userHash?: string;
  gender?: string;
  lastName?: string;
  firstName?: string;
  signUpDate?: Date;
  title?: string;
  role?: string;
  subscriptionId?: string;
  phone?: string;
  organization?: string;
  organizationEmployees?: string;
  organizationRevenue?: string;
  organizationIndustry?: string;
  organizationSicCode?: string;
  organizationDuns?: number;
  accountId?: string;
  firstVisitDate?: Date;
  score?: number;
  sfdcContactId?: string;
  customAttributes?: JsonMap;
}

export interface GainsightPXAccount extends GainsightPXGeoDetails {
  id: string;
  name?: string;
  trackedSubscriptionId?: string;
  industry?: string;
  numberOfEmployees?: number;
  sicCode?: string;
  website?: string;
  naicsCode?: string;
  plan?: string;
  sfdcId?: string;
  customAttributes?: JsonMap;
}
