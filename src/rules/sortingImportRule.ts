import * as ts from 'typescript';
import * as Lint from 'tslint';
import { AbstractRule } from 'tslint/lib/language/rule/abstractRule';
import * as os from 'os';

export class Rule extends AbstractRule {
	public static FAILURE_STRING = 'Module imports sorted incorrectly';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new SortingImportWalker(sourceFile, this.getOptions()));
	}
}

enum ImportType {
	EQUALS,
	NAMED,
	NAMED_WITHOUT_BRACKETS,
	NAMESPACE,
	SIDE_EFFECT
}

class SortingImportWalker extends Lint.RuleWalker {

	protected imports = [];

	protected visitSourceFile(node: ts.SourceFile): void {
		const MAX_LENGTH_IMPORT_TEXT = 1024;

		super.visitSourceFile(node);

		let importsCopy = this.imports.slice();

		importsCopy.sort((a, b) => {
			return (a.type * MAX_LENGTH_IMPORT_TEXT + a.node.getText().length) - (b.type * MAX_LENGTH_IMPORT_TEXT + b.node.getText().length);
		});

		for (let i = 0 ; i < this.imports.length; i++) {
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
				type: ImportType.SIDE_EFFECT
			});
		} else if (!node.importClause.namedBindings) {
			/* import K from 'G'; */
			this.imports.push({
				node: node,
				type: ImportType.NAMED_WITHOUT_BRACKETS
			});
		} else {
			switch (node.importClause.namedBindings.kind) {
				case ts.SyntaxKind.NamespaceImport:
					this.imports.push({
						node: node,
						type: ImportType.NAMESPACE
					});

					break;
				case ts.SyntaxKind.NamedImports:
					this.imports.push({
						node: node,
						type: ImportType.NAMED
					});

					break;
			}
		}
	}

	protected visitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration): void {
		this.imports.push({
			node: node,
			type: ImportType.EQUALS
		});
	}
}