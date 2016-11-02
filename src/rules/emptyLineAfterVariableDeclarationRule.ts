import * as ts from 'typescript';
import * as Lint from 'tslint/lib/lint';

import { AbstractRule } from 'tslint/lib/language/rule/abstractRule';

export class Rule extends AbstractRule {
	public static EMPTY_LINE_MISSING_AFTER_VARIABLE_DECLARATION_BLOCK_STRING = 'Variable declaration block should end with empty line';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new NoSpaceInMethodDeclarationWalker(sourceFile, this.getOptions()));
	}
}

class NoSpaceInMethodDeclarationWalker extends Lint.RuleWalker {
    protected visitVariableStatement(node: ts.VariableStatement): void {
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
        let isLastVariableStatement = false;
        let nextNode: ts.Node;

        for (let i = 0; nodeNeighbors.length > i; i++) {
            if (nodeNeighbors[i] === node) {
                nextNode = nodeNeighbors[i + 1];

                if (nextNode && nextNode.kind !== ts.SyntaxKind.VariableStatement) {
                    isLastVariableStatement = true;
                }

                break;
            }
        }

        if (isLastVariableStatement && nextNode) {
            let sourceFileText = node.getSourceFile().getFullText();
            let textBetweenNodes = sourceFileText.substring(node.getEnd(), nextNode.getStart());
            let firstNewLineIndex = textBetweenNodes.indexOf('\n');

            textBetweenNodes = textBetweenNodes.substring(firstNewLineIndex + 1, textBetweenNodes.length);

            if (textBetweenNodes.indexOf('\n') === -1) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(),
                    Rule.EMPTY_LINE_MISSING_AFTER_VARIABLE_DECLARATION_BLOCK_STRING));
            }
        }
    }
}
