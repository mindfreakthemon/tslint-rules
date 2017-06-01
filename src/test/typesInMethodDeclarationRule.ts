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
		'types-in-method-declaration': true
	}
});

describe('typeAfterMethodDeclarationRule', () => {
	describe('return types class methods', () => {
		it('should throw error when there is no return type', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo(){} }`;

			linter.lint('type-after-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(1);
		});

		it('should not throw error when there is no return type', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo(): void {} }`;

			linter.lint('type-after-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(0);
		});
	});

	describe('arguments types in class methods', () => {
		it('should throw error for one argument if there is no return type', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo(arg): void {} }`;

			linter.lint('type-after-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(1);
		});

		it('should throw error for multiple arguments if there is no return type', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo(arg: string, arg2): void {} }`;

			linter.lint('type-after-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(1);
		});

		it('should not throw error if there is no arguments', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo(): void {} }`;

			linter.lint('type-after-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(0);
		});

		it('should not throw error if one argument has type', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo(arg: string): void {} }`;

			linter.lint('type-after-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(0);
		});

		it('should not throw error if multiple arguments have types', () => {
			let linter = new Linter(options);
			let template = `class Foo { foo(arg: string, arg2: number): void {} }`;

			linter.lint('type-after-method-declaration.ts', template, configuration);

			expect(linter.getResult().errorCount).to.be.equal(0);
		});
	});
});
