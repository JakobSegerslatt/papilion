import { expect } from 'chai';
import 'mocha';

import {
    clearNulls,
    clone,
    convertToTypedClass,
    findKeyForValue,
    isObject,
} from '../src/index';

/** Class used in the tests */
class Foo {
    public foo: string;
    private bar: number[];
    constructor(foo: string, bar: number[]) {
        this.foo = foo;
        this.bar = bar;
    }
}

describe('clearNulls test', () => {
    it('should remove empty objects from objects', () => {
        const result = clearNulls({
            foo: 'foo',
            bar: {}
        });
        expect(result).to.eql({
            foo: 'foo'
        });
    });
    it('should remove null and undefined values from objects', () => {
        const result = clearNulls({
            foo: 'foo',
            bar: null,
            baz: {
                foo: undefined,
                bar: 'bar',
            }
        });
        expect(result).to.eql({
            foo: 'foo',
            baz: {
                bar: 'bar'
            }
        });
    });
    it('should keep empty arrays', () => {
        const result = clearNulls({
            foo: 'foo',
            bar: [],
        });
        expect(result).to.eql({
            foo: 'foo',
            bar: [],
        });
    });
});

describe('clone() test', () => {
    it('should clone an object', () => {
        const original = { foo: 'foo', bar: { foo: 'foo' }, baz: [] };
        const myClone = clone(original);
        expect(myClone).to.eql(original);
    });
    it('should clone a class', () => {
        const original = new Foo('foo', [1, 2, 3]);
        const myClone = clone(original);
        original.foo = 'bar';
        expect(myClone.foo).to.equal('foo');
    });
});

describe('convertToTypedClass() test', () => {
    it('should convert an object to a typed class', () => {
        const original = { foo: 'foo', bar: [1, 2, 3] };
        const foo = convertToTypedClass(Foo, original);
        const bar = new Foo('foo', [1, 2, 3]);
        expect(foo).to.eql(bar);
    });
});

describe('findKeyForValue() test', () => {
    enum FooEnum {
        foo = 'fooValue',
        bar = 2,
        baz = 'bazValue',
    }
    it('should find the correct key for a value within an object', () => {
        const foo = { foo: 'foo', bar: [1, 2, 3], baz: 'somevalue' };
        const value = findKeyForValue(foo, 'somevalue');
        expect(value).to.equal('baz');
    });
    it('should find the correct key for a string value within an enum', () => {
        const value = findKeyForValue(FooEnum, 'bazValue');
        expect(value).to.equal('baz');
    });
    it('should find the correct key for a number value within an enum', () => {
        const value = findKeyForValue(FooEnum, 2);
        expect(value).to.equal('bar');
    });
});

describe('isObject() test', () => {
    it('should return true for an object', () => {
        const result = isObject({ foo: 'foo', bar: [1, 2, 3] });
        expect(result).to.equal(true);
    });
    it('should return true for a date', () => {
        const result = isObject(new Date());
        expect(result).to.equal(true);
    });
    it('should return false for a string', () => {
        const result = isObject('foo');
        expect(result).to.equal(false);
    });
    it('should return false for a number', () => {
        const result = isObject(14);
        expect(result).to.equal(false);
    });
    it('should return false for an array', () => {
        const result = isObject(['foo', 'bar', 1]);
        expect(result).to.equal(false);
    });
});
