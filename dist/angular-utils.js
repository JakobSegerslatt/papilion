"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded.
        Import Core modules in the AppModule only.`);
    }
}
exports.throwIfAlreadyLoaded = throwIfAlreadyLoaded;
//# sourceMappingURL=angular-utils.js.map