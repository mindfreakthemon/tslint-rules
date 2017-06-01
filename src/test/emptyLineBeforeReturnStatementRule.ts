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
		'empty-line-before-return-statement': true
	}
});

describe('emptyLineBeforeReturnStatementRule', () => {
	it('should throw error when there is no empty line before `return` statement', () => {
		let linter = new Linter(options);
		let template = `class Foo {
							foo(val) {
								let a = 0;
		
								this.veryImportant(val);
								return val || a;
							}
						}`;
		
		linter.lint('empty-line-before-return-statement.ts', template, configuration);

		expect(linter.getResult().errorCount).to.be.equal(1);
	});

	it('should not throw any errors when there is empty line before `return` statement', () => {
		let linter = new Linter(options);
		let template = `class Foo {
							foo(val) {
								let a = 0;
		
								this.veryImportant(val);
								
								return val || a;
							}
						}`;
		linter.lint('empty-lines-at-block-statement.ts', template, configuration);

		expect(linter.getResult().errorCount).to.be.equal(0);
	});
});
