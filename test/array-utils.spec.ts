import { expect } from 'chai';
import 'mocha';

import {
    flattenTree,
    getRandomEntry,
    groupArrayByProperty,
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

describe('getRandomEntry() test', () => {
    const foo = [1, 2, 4, 6, 2, 19];
    it('should return a random entry from an array', () => {
        const bar = getRandomEntry(foo);
        expect(bar).to.not.equal(null);
    });

    it('should return undefined for an empty array', () => {
        const bar = getRandomEntry([]);
        expect(bar).to.equal(undefined);
    });

    it('should return the first entry for an array of 1', () => {
        const source = [{ foo: 'foo' }];
        const arrayToPopulate = [{ foo: 'foo' }];
        const bar = getRandomEntry(source, arrayToPopulate);
        expect(bar).to.eql({ foo: 'foo' });
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
