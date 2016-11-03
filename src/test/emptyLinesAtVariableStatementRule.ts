import chai = require('chai');
import Linter = require('tslint');

let expect = chai.expect;

const options = {
	formatter: 'json',
	configuration: {
		rules: {
			'empty-lines-at-variable-statement': true
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

	it('should throw error when there is no empty line before first variable statement', () => {
		let linter = new Linter('empty-line-after-variable-declaration.ts',
			`class Foo {
    foo(var1) {
        if (var1) {
        	let var2 = 2;
        	let var3;

        	var3 = var2++;
        }
        let var4 = 0;
        
        return var4;
    }
}`,
			options);
		let result = linter.lint();

		expect(result.failureCount).to.be.equal(1);
	});

	it('should throw 2 errors when there is no empty line before and after variable statement block', () => {
		let linter = new Linter('empty-line-after-variable-declaration.ts',
			`class Foo {
    foo(var1) {
        if (var1) {
        	let var2 = 2;
        	let var3;

        	var3 = var2++;
        }
        let var4 = 0;
        return var4;
    }
}`,
			options);
		let result = linter.lint();

		expect(result.failureCount).to.be.equal(2);
	});

	it('should not throw error when there is empty line before and after each variable statement blocks', () => {
		let linter = new Linter('empty-line-after-variable-declaration.ts',
			`class Foo {
    foo(var1) {
        if (var1) {
        	let var2 = 2;
        	let var3;

        	var3 = var2++;
        }
        
        let var4 = 0;
        
        return var4;
    }
}`,
			options);
		let result = linter.lint();

		expect(result.failureCount).to.be.equal(0);
	});
});
