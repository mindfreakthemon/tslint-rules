import chai = require('chai');
import Linter = require('tslint');

let expect = chai.expect;

const options = {
	formatter: 'json',
	configuration: {
		rules: {
			'empty-lines-at-block-statement': true
		}
	},
	rulesDirectory: 'rules/'
};

describe('emptyLineAtBlocksStatements', () => {
	describe('`if` statement', () => {
		it('should throw error when there is no empty line before `if` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
	foo(val) {
		let a = 0;
		if (!val) {
			val = 0;
		} else {
			val++;
		}

		return val;
	}
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should throw error when there is no empty line after `if` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
	foo(val) {
		let a = 0;

		if (!val) {
			val = 0;
		} else {
			val++;
		}
		return val;
	}
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not throw any errors when there is empty line after and before `if` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
	foo(val) {
		let a = 0;

		if (!val) {
			val = a;
		} else {
			val++;
		}

		return val;
	}
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});

	describe('`do` statement', () => {
		it('should throw error when there is no empty line before `do` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;
        do {
			a++;
        } while(a < var1);

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should throw error when there is no empty line after `do` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;

        do {
			a++;
        } while(a < var1);
        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not throw any errors when there is empty line after and before `do` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;

        do {
			a++;
        } while(a < var1);

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});

	describe('`while` statement', () => {
		it('should throw error when there is no empty line before `while` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;
        while(a < var1) {
			a++;
        }

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should throw error when there is no empty line after `while` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;

        while(a < var1) {
			a++;
        }
        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not throw any errors when there is empty line after and before `while` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;

        while(a < var1) {
			a++;
        }

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});

	describe('`for` statement', () => {
		it('should throw error when there is no empty line before `for` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;
        for(let i = 0; a < var1; i++) {
			a++;
        }

        return a * i;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should throw error when there is no empty line after `for` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;

        for(let i = 0; a < var1; i++) {
			a++;
        }
        return a * i;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not throw any errors when there is empty line after and before `for` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(var1) {
    	let a = 0;

        for(let i = 0; a < var1; i++) {
			a++;
        }

        return a * i;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});

	describe('`for in` statement', () => {
		it('should throw error when there is no empty line before `for in` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(obj) {
    	let a = '';
        for(let prop in obj) {
			a += ',' + obj[prop];
        }

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should throw error when there is no empty line after `for in` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(obj) {
    	let a = '';

        for(let prop in obj) {
			a += ',' + obj[prop];
        }
        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not throw any errors when there is empty line after and before `for in` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(obj) {
    	let a = '';

        for(let prop in obj) {
			a += ',' + obj[prop];
        }

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});

	describe('`for of` statement', () => {
		it('should throw error when there is no empty line before `for of` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(arr) {
    	let a = '';
        for(let val of arr) {
			a += ',' + val;
        }

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should throw error when there is no empty line after `for of` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(arr) {
    	let a = '';

        for(let val of arr) {
			a += ',' + val;
        }
        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not throw any errors when there is empty line after and before `for of` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(arr) {
    	let a = '';

        for(let val of arr) {
			a += ',' + val;
        }

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});

	describe('`switch` statement', () => {
		it('should throw error when there is no empty line before `switch` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(val) {
    	let a = 0;
    	switch(val) {
    		case 'a':
    			a = 1;
    			break;
    		case 'b':
    			a = 2;
    			break;
    	}

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should throw error when there is no empty line after `switch` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(val) {
    	let a = 0;

    	switch(val) {
    		case 'a':
    			a = 1;
    			break;
    		case 'b':
    			a = 2;
    			break;
    	}
        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(1);
		});

		it('should not throw any errors when there is empty line after and before `switch` statement', () => {
			let linter = new Linter('empty-lines-at-block-statement.ts',
				`class Foo {
    foo(val) {
    	let a = 0;

    	switch(val) {
    		case 'a':
    			a = 1;
    			break;
    		case 'b':
    			a = 2;
    			break;
    	}

        return a;
    }
}`,
				options);
			let result = linter.lint();

			expect(result.failureCount).to.be.equal(0);
		});
	});
});
