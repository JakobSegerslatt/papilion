'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
describe('simple validate test', () => {
    it('should return camelCase for CamelCase string', () => {
        var result = index.pascalCase('CamelCase');
        expect(result).to.equal('camelCase');
    });
    it('should return pascalCase for pamelCase string', () => {
        var result = index.pascalCase('pascalCase');
        expect(result).to.equal('pascalCase');
    });
    it('should return empty string for null string', () => {
        var result = index.pascalCase(null);
        expect(result).to.equal('');
    });
    it('should return true  empty string undefined string', () => {
        var result = index.pascalCase(undefined);
        expect(result).to.equal('');
    });
    it('should return empty string for empty string', () => {
        var result = index.pascalCase('');
        expect(result).to.equal('');
    });
    it('should return whitespace for whitespace string', () => {
        var result = index.pascalCase(' ');
        expect(result).to.equal(' ');
    });
});