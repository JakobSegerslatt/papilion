/**
 * Used when exporting Angular modules.
 * Makes sure that a module is only imported once in an application.
 *
 * @example
 * import { NgModule, Optional, SkipSelf } from '@angular/core';
 * export class CoreModule {
 * constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
 *   throwIfAlreadyLoaded(parentModule, 'CoreModule');
 *  }
 * }
 *
 * @param parentModule The module being exported
 * @param moduleName The property name of the module
 */
export declare function throwIfAlreadyLoaded(parentModule: any, moduleName: string): void;
