import chai = require('chai');
import Linter = require('tslint');

let expect = chai.expect;

const options = {
	formatter: 'json',
	configuration: {
		rules: {
			'whitespace-in-method-declaration': true
		}
	},
	rulesDirectory: 'rules/'
};

describe('whitespaceInMethodDeclarationRule', () => {
	describe('for anonymous function', () => {
		it('should throw error when there is no space', () => {
			let linter = new Linter('whitespace-in-method-declaration.ts', `function(){}`, options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not trow error when there is a space', () => {
			let linter = new Linter('whitespace-in-method-declaration.ts', `function (){}`, options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});

	describe('for named function', () => {
		it('should throw error when there is a space', () => {
			let linter = new Linter('whitespace-in-method-declaration.ts', `function foo (){}`, options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not trow error when there is no space', () => {
			let linter = new Linter('whitespace-in-method-declaration.ts', `function foo(){}`, options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});

	describe('for class methods', () => {
		it('should throw error when there is a space', () => {
			let linter = new Linter('whitespace-in-method-declaration.ts', `class Foo { foo (){} }`, options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not trow error when there is no space', () => {
			let linter = new Linter('whitespace-in-method-declaration.ts', `class Foo { foo(){} }`, options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});
});
