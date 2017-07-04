import * as ts from 'typescript';
import * as Lint from 'tslint';
import { AbstractRule } from 'tslint/lib/language/rule/abstractRule';

interface ISortingImportOptions {
	orderImportType: string[];
	orderSortingType: string;
}

const defaultImportTypeSortingOrder = ['EQUALS', 'NAMED', 'NAMED_WITHOUT_BRACKETS', 'NAMESPACE', 'SIDE_EFFECT'];

enum SortingDirection {
	MIN_TO_MAX_LENGTH,
	MAX_TO_MIN_LENGTH
}

export class Rule extends AbstractRule {
	public static FAILURE_STRING = 'Module imports sorted incorrectly';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new SortingImportWalker(sourceFile, this.getOptions()));
	}
}

class SortingImportWalker extends Lint.RuleWalker {
	protected imports = [];

	private ruleOptions: ISortingImportOptions;

	private defaultOptions: ISortingImportOptions = {
		orderImportType: defaultImportTypeSortingOrder,
		orderSortingType: 'MIN_TO_MAX_LENGTH'
	};

	public static metadata: Lint.IRuleMetadata = {
		ruleName: 'sorting-import',
		description: '',
		hasFix: true,
		optionsDescription: Lint.Utils.dedent `sorting imports`,
		options: {
			type: 'object',
			properties: {
				'orderImportType': {
					type: 'string',
					enum: defaultImportTypeSortingOrder
				},
				'orderSortingType': {
					type: 'string',
					enum: 'MIN_TO_MAX_LENGTH'
				}
			},
			additionalProperties: false,
		},
		optionExamples: [
			true,
			[true, {
				'orderSortingType': 'MAX_TO_MIN_LENGTH'
			}],
			[true, {
				'orderImportType': ['NAMED', 'SIDE_EFFECT', 'NAMESPACE', 'NAMED_WITHOUT_BRACKETS', 'EQUALS']
			}],
			[true, {
				'orderImportType': ['NAMED', 'SIDE_EFFECT', 'NAMESPACE', 'NAMED_WITHOUT_BRACKETS', 'EQUALS'],
				'orderSortingType': 'MAX_TO_MIN_LENGTH'
			}]
		],
		type: 'maintainability',
		typescriptOnly: false
	};

	protected visitSourceFile(node: ts.SourceFile): void {
		let options = this.getOptions()[0];

		this.ruleOptions = {
			orderImportType: options && options.orderImportType || this.defaultOptions.orderImportType,
			orderSortingType: options && options.orderSortingType || this.defaultOptions.orderSortingType
		};

		if (this.ruleOptions.orderImportType.length < 5) {
			throw 'orderImportType option must contain array with all 5 keys like ' +
			'["EQUALS", "NAMED", "NAMED_WITHOUT_BRACKETS", "NAMESPACE", "SIDE_EFFECT"]';
		}

		let sortFunction = this.getSortFunction();

		super.visitSourceFile(node);

		let importsCopy = this.imports.slice();

		importsCopy.sort((a, b) => sortFunction(a, b));

		for (let i = 0; i < this.imports.length; i++) {
			let importNode = this.imports[i].node;
			let importCopyNode = importsCopy[i].node;

			if (importNode.getText() !== importCopyNode.getText()) {
				let fix = new Lint.Replacement(importNode.getStart(), importNode.getWidth(), importCopyNode.getText());

				this.addFailureAt(importNode.getStart(), importNode.getWidth(), Rule.FAILURE_STRING, fix);
			}
		}
	}

	protected visitImportDeclaration(node: ts.ImportDeclaration): void {
		if (!node.importClause) {
			/* import 'sideEffect'; */
			this.imports.push({
				node: node,
				type: 'SIDE_EFFECT'
			});
		} else if (!node.importClause.namedBindings) {
			/* import K from 'G'; */
			this.imports.push({
				node: node,
				type: 'NAMED_WITHOUT_BRACKETS'
			});
		} else {
			switch (node.importClause.namedBindings.kind) {
				case ts.SyntaxKind.NamespaceImport:
					this.imports.push({
						node: node,
						type: 'NAMESPACE'
					});
					break;
				case ts.SyntaxKind.NamedImports:
					this.imports.push({
						node: node,
						type: 'NAMED'
					});
					break;
			}
		}
	}

	protected visitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration): void {
		this.imports.push({
			node: node,
			type: 'EQUALS'
		});
	}

	private getSortFunction(): Function {
		let importTypeSortingOrder = this.ruleOptions.orderImportType;

		return (a, b) => {
			if (importTypeSortingOrder.indexOf(a.type) > importTypeSortingOrder.indexOf(b.type)) {
				return 1;
			}

			if (importTypeSortingOrder.indexOf(a.type) < importTypeSortingOrder.indexOf(b.type)) {
				return -1;
			}

			return SortingDirection[this.ruleOptions['orderSortingType']] === SortingDirection.MAX_TO_MIN_LENGTH
				? b.node.getText().length - a.node.getText().length
				: a.node.getText().length - b.node.getText().length;
		};
	}
}