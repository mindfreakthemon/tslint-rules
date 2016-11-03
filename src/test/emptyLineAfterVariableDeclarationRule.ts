import chai = require('chai');
import Linter = require('tslint');

let expect = chai.expect;

const options = {
	formatter: 'json',
	configuration: {
		rules: {
			'empty-line-after-variable-declaration': true
		}
	},
	rulesDirectory: 'rules/'
};

describe('emptyLineAfterVariableDeclaration', () => {
	it('should throw error when there is no empty line after last variable statement', () => {
		let linter = new Linter('empty-line-after-variable-declaration.ts',
			`class Foo {
    foo(var1) {
        if (var1) {
        	let var2 = 2;
        	let var3;
        	var3 = var2++;
        }
    }
}`,
			options);
		let result = linter.lint();

		expect(result.failureCount).to.be.equal(1);
	});

	it('should throw error when there is no empty line after last variable statement outside class method', () => {
		let linter = new Linter('empty-line-after-variable-declaration.ts',
			`var outerVar1 = '1';
var outerVar2 = '2';
class Foo {
    foo(var1) {
        if (var1) {
        	let var2 = 2;
        	let var3;

        	var3 = var2++;
        }
    }
}`,
			options);
		let result = linter.lint();

		expect(result.failureCount).to.be.equal(1);
	});

	it('should not throw error when there is empty line after each last variable statement', () => {
		let linter = new Linter('empty-line-after-variable-declaration.ts',
			`var outerVar1 = '1';
var outerVar2 = '2';

class Foo {
    foo(var1) {
        if (var1) {
        	let var2 = 2;
        	let var3;

        	var3 = var2++;
        }
    }
}`,
			options);
		let result = linter.lint();

		expect(result.failureCount).to.be.equal(0);
	});
});