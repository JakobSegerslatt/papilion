import { expect } from 'chai';
import 'mocha';

import {
    Timer
} from '../src/index';

describe('Timer test', () => {
    it('should be 36 character long', () => {
        const timer = new Timer(() => {
            console.log('Timer works');
        });
        timer.stop();
        expect(timer).to.equal(36);
    });
});
