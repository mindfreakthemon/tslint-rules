import chai = require('chai');
import { Linter, Configuration } from 'tslint';

let expect = chai.expect;

const options = {
	fix: false,
	formatter: 'json',
	rulesDirectory: 'rules/'
};

let configuration = Configuration.parseConfigFile({
	rulesDirectory: ['rules/'],
	rules: {
		'whitespace-in-method-declaration': true
	}
});

describe('whitespaceInMethodDeclarationRule', () => {
	describe('for anonymous function', () => {
		it('should throw error when there is no space', () => {
			let linter = new Linter(options);
			let template = `function(){}`;

			linter.lint('whitespace-in-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(1);
		});

		it('should not trow error when there is a space', () => {
			let linter = new Linter(options);
			let template = `function (){}`;

			linter.lint('whitespace-in-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(0);
		});
	});

	describe('for named function', () => {
		it('should throw error when there is a space', () => {
			let linter = new Linter(options);
			let template = `function foo (){}`;

			linter.lint('whitespace-in-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(1);
		});

		it('should not trow error when there is no space', () => {
			let linter = new Linter(options);
			let template = `function foo(){}`;

			linter.lint('whitespace-in-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(0);
		});
	});

	describe('for class methods', () => {
		it('should throw error when there is a space', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo (){} }`;

			linter.lint('whitespace-in-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(1);
		});

		it('should not trow error when there is no space', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo(){} }`;

			linter.lint('whitespace-in-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(0);
		});
	});
});
