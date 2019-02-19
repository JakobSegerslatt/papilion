import { expect } from 'chai';
import 'mocha';

import {
    clearNulls,
    clone,
    convertToTypedClass,
    findKeyForValue,
    flattenTree,
    groupArrayByProperty,
    isObject,
    removeDuplicates,
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

describe('flattentree() test', () => {
    it('should flatten a tree array but keep objects intact', () => {
        const foo = [{
            foo: 'foo1',
            bar: [{
                foo: 'foo2',
                bar: [{
                    foo: 'foo3',
                    bar: [{
                        foo: 'foo4',
                        bar: [],
                    }]
                }]
            },
            ]
        }, {
            foo: 'foo5',
        }];
        const flat = flattenTree(foo, 'bar');
        expect(flat).to.eql([{
            foo: 'foo1',
            bar: [{
                foo: 'foo2',
                bar: [{
                    foo: 'foo3',
                    bar: [{
                        foo: 'foo4',
                        bar: [],
                    }]
                }]
            }]
        },
        {
            foo: 'foo2',
            bar: [{
                foo: 'foo3',
                bar: [{
                    foo: 'foo4',
                    bar: [],
                }]
            }]
        },
        {
            foo: 'foo3',
            bar: [{
                foo: 'foo4',
                bar: [],
            }]
        },
        {
            foo: 'foo4',
            bar: [],
        },
        {
            foo: 'foo5',
        }
        ]);
    });
});

describe('groupArrayByProperty() test', () => {
    const ungrouped = [
        {
            categoryName: 'cat1',
            categoryNumber: 1,
            id: 1
        },
        {
            categoryName: 'cat3',
            categoryNumber: 3,
            id: 2
        },
        {
            categoryName: 'cat2',
            categoryNumber: 2,
            id: 3
        },
        {
            categoryName: 'cat1',
            categoryNumber: 1,
            id: 4
        }
    ];
    it('should group an array based on a property with a string value', () => {
        const grouped = groupArrayByProperty(ungrouped, 'categoryName');
        expect(grouped).to.eql([
            [
                {
                    categoryName: 'cat1',
                    categoryNumber: 1,
                    id: 1
                },
                {
                    categoryName: 'cat1',
                    categoryNumber: 1,
                    id: 4
                }
            ],
            [
                {
                    categoryName: 'cat3',
                    categoryNumber: 3,
                    id: 2
                },
            ],
            [
                {
                    categoryName: 'cat2',
                    categoryNumber: 2,
                    id: 3
                },
            ]
        ]);
    });
    it('should group an array based on a property ' +
        'with a number valuye based on a function', () => {
            const grouped = groupArrayByProperty(ungrouped, (x) => x.categoryNumber);

            expect(grouped).to.eql([
                [
                    {
                        categoryName: 'cat1',
                        categoryNumber: 1,
                        id: 1
                    },
                    {
                        categoryName: 'cat1',
                        categoryNumber: 1,
                        id: 4
                    }
                ],
                [
                    {
                        categoryName: 'cat3',
                        categoryNumber: 3,
                        id: 2
                    },
                ],
                [
                    {
                        categoryName: 'cat2',
                        categoryNumber: 2,
                        id: 3
                    },
                ]
            ]);
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

describe('removeDuplicates() test', () => {
    it('should remove duplicates form a string array', () => {
        const foo = ['foo', 'bar', 'foo', 'baz', ''];
        const result = removeDuplicates(foo);
        expect(result).to.eql(['foo', 'bar', 'baz', '']);
    });
    it('should remove duplicates form a number array', () => {
        const foo = [1, 2, 4, 1, 3, 3, 2];
        const result = removeDuplicates(foo);
        expect(result).to.eql([1, 2, 4, 3]);
    });
    // it('should remove duplicates form a object array', () => {
    //     const foo = [
    //         { foo: 'foo' },
    //         { bar: 'bar' },
    //         { foo: 'foo' },
    //         { foo: 'foo' },
    //         { baz: 'baz' },
    //         { baz: 'baz' },
    //     ];
    //     const result = removeDuplicates(foo);
    //     expect(result).to.eql([
    //         { foo: 'foo' },
    //         { bar: 'bar' },
    //         { baz: 'baz' },
    //     ]);
    // });
});
