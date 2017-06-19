import chai = require('chai');
import { Linter, Configuration } from 'tslint';

let expect = chai.expect;

let configuration = Configuration.parseConfigFile({
	rulesDirectory: ['rules/'],
	rules: {
		'sorting-import': true
	}
});

/**
 * import Z = require('Q');
 * import { X } from 'y';
 * import K from 'G';
 * import * as B from 'W';
 * import 'S';
 */
describe('sortingImportRule', () => {
	it('should throw error when list imports are sorted incorrectly', () => {
		const options = {
			fix: false,
			formatter: 'json',
			rulesDirectory: 'rules/'
		};

		let linter = new Linter(options);
		let template = `/**
		*
		*
		*
		*/
		
		
		import Z = require('Q');
			import Z = require('QQ');
			import { XX } from 'YY';
			import K from 'G';
			import { X } from 'Y';
			import K from 'GG';
			import * as B from 'WWWW';
			import 'SSSSSSSSSS';
			import 'SSS';
			import * as B from 'WWWWWWWWW';
			import 'SSS';
			import * as B from 'WW';
			import 'SSSSSSS';
			import K from 'GGG';
			import 'SSSSS';
			import 'SSSSSS';
			import * as B from 'W';
			import 'SSS';
			import * as B from 'WWWWWW';
			
			class E extends O {
				constructor() {}	
			}
		`;

		linter.lint('sorting-import.ts', template, configuration);
		expect(linter.getResult().errorCount).to.be.equal(16);
	});

	it('should no throw error when list imports are sorted correctly', () => {
		const options = {
			fix: true,
			formatter: 'json',
			rulesDirectory: 'rules/'
		};

		let linter = new Linter(options);
		let template = `
					/**
					*
					*
					*/
			import Z = require('Q');
			import Z = require('QQ');
			import { X } from 'Y';
			import { XX } from 'YY';
			import K from 'G';
			import K from 'GG';
			import K from 'GGG';
			import * as B from 'W';
			import * as B from 'WW';
			import * as B from 'WWWW';
			import * as B from 'WWWWWW';
			import * as B from 'WWWWWWWWW';
			import 'SSS';
			import 'SSS';
			import 'SSS';
			import 'SSSSS';
			import 'SSSSSS';
			import 'SSSSSSS';
			import 'SSSSSSSSSS';
			
			class E extends O {
				constructor() {}	
			}
		`;

		linter.lint('sorting-import.ts', template, configuration);

		expect(linter.getResult().errorCount).to.be.equal(0);
	});
});
