import * as ts from 'typescript';
import * as Lint from 'tslint';

import { AbstractRule } from 'tslint/lib/language/rule/abstractRule';

export class Rule extends AbstractRule {
	public static RETURN_TYPE_MISSING = 'Missing return statement after method declaration';
	public static ARGUMENT_TYPE_MISSING = 'Missing argument type in method declaration';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new TypesAInMethodDeclarationWalker(sourceFile, this.getOptions()));
	}
}

class TypesAInMethodDeclarationWalker extends Lint.RuleWalker {
	
	protected visitMethodDeclaration(node: ts.MethodDeclaration): void {
		let methodBody = node.body ? node.body.getText() : '';
		let methodText = node.getText();
		let methodDeclaration = methodText.replace(methodBody, '');

		this.checkMethodReturnType(node, methodDeclaration);
		this.checkMethodArgumentsType(node, methodDeclaration);

		super.visitMethodDeclaration(node);
	}

	protected checkMethodReturnType(node: ts.MethodDeclaration, methodDeclaration: string): void {
		let regExp = new RegExp('\\):');

		if (!regExp.test(methodDeclaration)) {
			this.addFailureAt(node.getStart(), node.getWidth(), Rule.RETURN_TYPE_MISSING);
		}
	}

	protected checkMethodArgumentsType(node: ts.MethodDeclaration, methodDeclaration: string): void {
		let regExp = new RegExp('\\(.+\\)');
		let argumentsRegExp = new RegExp(':.+');
		let argumentsMatch = methodDeclaration.match(regExp);

		if (!argumentsMatch) {
			return;
		}

		let argumentsArray = argumentsMatch[0].slice(1,-1).split(',');

		argumentsArray.forEach((element: string) => {
			if (!argumentsRegExp.test(element)) {
				this.addFailureAt(node.getStart(), node.getWidth(), Rule.ARGUMENT_TYPE_MISSING);
			}
		});
	}
}
