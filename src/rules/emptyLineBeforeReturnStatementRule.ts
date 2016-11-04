import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

import { AbstractRule } from 'tslint/lib/language/rule/abstractRule';

export class Rule extends AbstractRule {
	public static EMPTY_LINE_MISSING_BEFORE_RETURN_STRING = 'Return statement should have empty line before it';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new EmptyLineBeforeReturnStatementWalker(sourceFile, this.getOptions()));
	}
}

class EmptyLineBeforeReturnStatementWalker extends Lint.RuleWalker {
    protected visitReturnStatement(node: ts.ReturnStatement): void {
        let variableStatementParent = node.parent;
        let blockChildren = variableStatementParent.getChildren();
        let syntaxList: ts.Node;

        for (let i = 0; blockChildren.length > i; i++) {
            let child = blockChildren[i];

            if (child.kind == ts.SyntaxKind.SyntaxList) {
                syntaxList = child;
                break;
            }
        }

        if (!syntaxList) {
            return;
        }

        let nodeNeighbors = syntaxList.getChildren();

        for (let i = 0; nodeNeighbors.length > i; i++) {
            if (nodeNeighbors[i] === node) {
                let previousNode = i && nodeNeighbors[i - 1];

                if (previousNode) {
                    let sourceFileText = node.getSourceFile().getFullText();
                    let textBeforeNode = sourceFileText.substring(previousNode.getEnd(), node.getStart());
                    let firstNewLineIndex = textBeforeNode.indexOf('\n');

                    textBeforeNode = textBeforeNode.substring(firstNewLineIndex + 1, textBeforeNode.length);

                    if (textBeforeNode.indexOf('\n') === -1) {
                        this.addFailure(this.createFailure(node.getStart(), node.getWidth(),
                            Rule.EMPTY_LINE_MISSING_BEFORE_RETURN_STRING));
                    }
                }

                break;
            }
        }
    }
}
