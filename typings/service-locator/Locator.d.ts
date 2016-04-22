/// <reference path="./../koa/collections/SimpleDictionary.d.ts" />
/// <reference path="./../node/node.d.ts" />
declare module '@osc/service-locator/Locator' {
import { SimpleDictionary } from '@osc/koa/collections/SimpleDictionary';
export class Locator extends SimpleDictionary {
    applicationName: string;
    database: any;
    rpc: any;
    events: any;
    logger: any;
}
}
