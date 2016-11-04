import chai = require('chai');
import Linter = require('tslint');

let expect = chai.expect;

const options = {
	formatter: 'json',
	configuration: {
		rules: {
			'empty-line-before-return-statement': true
		}
	},
	rulesDirectory: 'rules/'
};

describe('emptyLineBeforeReturnStatementRule', () => {
	it('should throw error when there is no empty line before `return` statement', () => {
		let linter = new Linter('empty-line-before-return-statement.ts',
			`class Foo {
	foo(val) {
		let a = 0;
		
		this.veryImportant(val);
		return val || a;
	}
}`,
			options);
		let result = linter.lint();

		expect(result.failureCount).to.be.equal(1);
	});

	it('should not throw any errors when there is empty line before `return` statement', () => {
		let linter = new Linter('empty-lines-at-block-statement.ts',
			`class Foo {
	foo(val) {
		let a = 0;

		this.veryImportant(val);

		return val || a;
	}
}`,
			options);
		let result = linter.lint();

		expect(result.failureCount).to.be.equal(0);
	});
});
