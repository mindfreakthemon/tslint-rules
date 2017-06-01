import * as ts from 'typescript';
import * as Lint from 'tslint';

import { AbstractRule } from 'tslint/lib/language/rule/abstractRule';

export class Rule extends AbstractRule {
	public static FAILURE_METHOD_STRING = 'White space is not allowed between method name and ()';
	public static FAILURE_FUNCTION_STRING = 'There must be whitespace between function and ()';
	public static FAILURE_NAMED_FUNCTION_STRING = 'White space is not allowed between function name and ()';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new NoSpaceInMethodDeclarationWalker(sourceFile, this.getOptions()));
	}
}

class NoSpaceInMethodDeclarationWalker extends Lint.RuleWalker {

	protected visitMethodDeclaration(node: ts.MethodDeclaration) {
		let methodBody = node.body.getText();
		let methodText = node.getText();
		let methodDeclaration = methodText.replace(methodBody, '');
		let regExp = new RegExp(`\\s\\(`);

		if (regExp.test(methodDeclaration)) {
			this.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_METHOD_STRING);
		}

		super.visitMethodDeclaration(node);
	}

	protected visitFunctionDeclaration(node: ts.FunctionDeclaration) {
		let isAnonymous = !node.name.text;
		let methodBody = node.body.getText();
		let methodText = node.getText();
		let methodDeclaration = methodText.replace(methodBody, '');
		let errorMsg = isAnonymous ? Rule.FAILURE_FUNCTION_STRING : Rule.FAILURE_NAMED_FUNCTION_STRING;
		let regExp: RegExp;

		if (isAnonymous) {
			regExp = new RegExp(`function\\s\\(`);
		} else {
			regExp = new RegExp(`function ${node.name.text}\\(`);
		}

		if (!regExp.test(methodDeclaration)) {
			this.addFailureAt(node.getStart(), node.getWidth(), errorMsg);
		}

		super.visitFunctionDeclaration(node);
	}

	protected visitFunctionExpression(node: ts.FunctionExpression) {
		let isAnonymous = node.name.text;
		let methodBody = node.body.getText();
		let methodText = node.getText();
		let methodDeclaration = methodText.replace(methodBody, '');
		let errorMsg = isAnonymous ? Rule.FAILURE_FUNCTION_STRING : Rule.FAILURE_NAMED_FUNCTION_STRING;
		let regExp: RegExp;

		if (isAnonymous) {
			regExp = new RegExp(`function\\s\\(`);
		} else {
			regExp = new RegExp(`function ${node.name.text}\\(`);
		}

		if (!regExp.test(methodDeclaration)) {
			this.addFailureAt(node.getStart(), node.getWidth(), errorMsg);
		}

		super.visitFunctionExpression(node);
	}
}
