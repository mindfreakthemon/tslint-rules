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
		'empty-lines-at-variable-statement': true
	}
});

describe('emptyLineAfterVariableDeclaration', () => {
	it('should throw error when there is no empty line after last variable statement', () => {
		let linter = new Linter(options);
		let template = `class Foo {
								foo(val) {
									if (val) {
										let val1 = 2;
										let val2;
										val2 = val1++;
									}
								}
							}`;

		linter.lint('empty-lines-at-variable-statement.ts', template, configuration);

		expect(linter.getResult().errorCount).to.be.equal(1);
	});

	it('should throw error when there is no empty line before first variable statement', () => {
		let linter = new Linter(options);
		let template = `class Foo {
								foo(val) {
									if (val) {
										let val1 = 2;
										let val2;
										
										val2 = val1++;
									}
									let val4 = 0;
        
                                    return val4;
								}
							}`;

		linter.lint('empty-lines-at-variable-statement.ts', template, configuration);

		expect(linter.getResult().errorCount).to.be.equal(1);
	});

	it('should throw 2 errors when there is no empty line before and after variable statement block', () => {
		let linter = new Linter(options);
		let template = `class Foo {
								foo(val) {
									if (val) {
										let val1 = 2;
										let val2;
										
										val2 = val1++;
									}
									let val4 = 0;
                                    return val4;
								}
							}`;

		linter.lint('empty-lines-at-variable-statement.ts', template, configuration);

		expect(linter.getResult().errorCount).to.be.equal(2);
	});

	it('should not throw error when there is empty line before and after each variable statement blocks', () => {
		let linter = new Linter(options);
		let template = `class Foo {
								foo(val) {
									if (val) {
										let val1 = 2;
										let val2;
										
										val2 = val1++;
									}
									
									let val4 = 0;
        
                                    return val4;
								}
							}`;

		linter.lint('empty-lines-at-variable-statement.ts', template, configuration);

		expect(linter.getResult().errorCount).to.be.equal(0);
	});
});
