import { expect } from 'chai';
import 'mocha';

import {
    throwIfAlreadyLoaded
} from '../src/index';

class CoreModule {
    constructor(parentModule?: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

describe('throwIfAlreadyLoaded test', () => {
    it('should', () => {
        const coreModule1 = new CoreModule();
        const coreModule2 = new CoreModule();
        expect(coreModule1).to.deep.equal(coreModule2);
    });
});
