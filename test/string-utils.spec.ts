import { expect } from 'chai';
import 'mocha';

import {
    createGuid,
    contains,
    isNotNullorEmpty,
    pascalCase,
    trimString,
} from '../src/index';

describe('createGuid() test', () => {
    it('should be 36 character long', () => {
        const result = createGuid();
        expect(result.length).to.equal(36);
    });
    it('should create different GUIDs', () => {
        const result1 = createGuid();
        const result2 = createGuid();
        expect(result1).to.not.equal(result2);
    });
});

describe('contains() test', () => {
    it('should return true for foo, oo', () => {
        const result = contains('foo', 'oo');
        expect(result).to.equal(true);
    });
});

describe('pascalCase() test', () => {
    it('should return camelCase for CamelCase string', () => {
        const result = pascalCase('CamelCase');
        expect(result).to.equal('camelCase');
    });
    it('should return pascalCase for pamelCase string', () => {
        const result = pascalCase('pascalCase');
        expect(result).to.equal('pascalCase');
    });
    it('should return empty string for null string', () => {
        const result = pascalCase(null as any);
        expect(result).to.equal('');
    });
    it('should return true  empty string undefined string', () => {
        const result = pascalCase(undefined as any);
        expect(result).to.equal('');
    });
    it('should return empty string for empty string', () => {
        const result = pascalCase('');
        expect(result).to.equal('');
    });
    it('should return whitespace for whitespace string', () => {
        const result = pascalCase(' ');
        expect(result).to.equal(' ');
    });
});
