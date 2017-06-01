import * as ts from 'typescript';
import * as Lint from 'tslint';

import { AbstractRule } from 'tslint/lib/language/rule/abstractRule';

export class Rule extends AbstractRule {
	public static EMPTY_LINE_MISSING_BEFORE_VARIABLE_DECLARATION_BLOCK_STRING = 'Variable declaration block should start with empty line';
	public static EMPTY_LINE_MISSING_AFTER_VARIABLE_DECLARATION_BLOCK_STRING = 'Variable declaration block should end with empty line';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new EmptyLinesAtVariableStatementWalker(sourceFile, this.getOptions()));
	}
}

class EmptyLinesAtVariableStatementWalker extends Lint.RuleWalker {
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
        let isFirstVariableStatement = false;
        let isLastVariableStatement = false;
        let previousNode: ts.Node;
        let nextNode: ts.Node;

        for (let i = 0; nodeNeighbors.length > i; i++) {
            if (nodeNeighbors[i] === node) {
                previousNode = i && nodeNeighbors[i - 1];
                nextNode = nodeNeighbors[i + 1];

                if (previousNode && previousNode.kind !== ts.SyntaxKind.VariableStatement) {
                    isFirstVariableStatement = true;
                }
                if (nextNode && nextNode.kind !== ts.SyntaxKind.VariableStatement) {
                    isLastVariableStatement = true;
                }

                break;
            }
        }

        if (isFirstVariableStatement && previousNode) {
            let sourceFileText = node.getSourceFile().getFullText();
            let textBetweenBeforeNodes = sourceFileText.substring(previousNode.getEnd(), node.getStart());
            let firstNewLineIndex = textBetweenBeforeNodes.indexOf('\n');

            textBetweenBeforeNodes = textBetweenBeforeNodes.substring(firstNewLineIndex + 1, textBetweenBeforeNodes.length);

            if (textBetweenBeforeNodes.indexOf('\n') === -1) {
                this.addFailureAt(node.getStart(), node.getWidth(), Rule.EMPTY_LINE_MISSING_BEFORE_VARIABLE_DECLARATION_BLOCK_STRING);
            }
        }

        if (isLastVariableStatement && nextNode) {
            let sourceFileText = node.getSourceFile().getFullText();
            let textBetweenAfterNodes = sourceFileText.substring(node.getEnd(), nextNode.getStart());
            let firstNewLineIndex = textBetweenAfterNodes.indexOf('\n');

            textBetweenAfterNodes = textBetweenAfterNodes.substring(firstNewLineIndex + 1, textBetweenAfterNodes.length);

            if (textBetweenAfterNodes.indexOf('\n') === -1) {
                this.addFailureAt(node.getStart(), node.getWidth(), Rule.EMPTY_LINE_MISSING_AFTER_VARIABLE_DECLARATION_BLOCK_STRING);
            }
        }
    }
}
