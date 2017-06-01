import * as ts from 'typescript';
import * as Lint from 'tslint';

import { AbstractRule } from 'tslint/lib/language/rule/abstractRule';

export class Rule extends AbstractRule {
	public static EMPTY_LINE_MISSING_IF_STATEMENT_STRING = '\'if\' block should start end end with empty line';
	public static EMPTY_LINE_MISSING_DO_STATEMENT_STRING = '\'do\' block should start end end with empty line';
    public static EMPTY_LINE_MISSING_WHILE_STATEMENT_STRING = '\'while\' block should start end end with empty line';
    public static EMPTY_LINE_MISSING_FOR_STATEMENT_STRING = '\'for\' block should start end end with empty line';
    public static EMPTY_LINE_MISSING_FOR_IN_STATEMENT_STRING = '\'for in\' block should start end end with empty line';
    public static EMPTY_LINE_MISSING_FOR_OF_STATEMENT_STRING = '\'for of\' block should start end end with empty line';
    public static EMPTY_LINE_MISSING_SWITCH_STATEMENT_STRING = '\'switch\' block should start end end with empty line';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new EmptyLinesAtBlockStatementWalker(sourceFile, this.getOptions()));
	}
}

class EmptyLinesAtBlockStatementWalker extends Lint.RuleWalker {
    protected visitNode(node: ts.Node): void {
        super.visitNode(node);

        let blockKinds = [
            ts.SyntaxKind.IfStatement,
            ts.SyntaxKind.DoStatement,
            ts.SyntaxKind.WhileStatement,
            ts.SyntaxKind.ForStatement,
            ts.SyntaxKind.ForInStatement,
            ts.SyntaxKind.ForOfStatement,
            ts.SyntaxKind.SwitchStatement
        ];

        if (blockKinds.indexOf(node.kind) === -1) {
            return;
        }

        let blockStatementParent = node.parent;
        let blockParentChildren = blockStatementParent.getChildren();
        let syntaxList: ts.Node;

        for (let i = 0; blockParentChildren.length > i; i++) {
            let child = blockParentChildren[i];

            if (child.kind == ts.SyntaxKind.SyntaxList) {
                syntaxList = child;
                break;
            }
        }

        if (!syntaxList) {
            return;
        }

        let nodeNeighbors = syntaxList.getChildren();
        let sourceFileText = node.getSourceFile().getFullText();
        let hasPreviousNode = false;
        let hasNextNode = false;
        let previousNode: ts.Node;
        let nextNode: ts.Node;
        let addFailure = false;

        for (let i = 0; nodeNeighbors.length > i; i++) {
            if (nodeNeighbors[i] === node) {
                previousNode = i && nodeNeighbors[i - 1];
                nextNode = nodeNeighbors[i + 1];
                hasPreviousNode = !!previousNode;
                hasNextNode = !!nextNode;

                break;
            }
        }

        if (hasPreviousNode) {
            let textBeforeNode = sourceFileText.substring(previousNode.getEnd(), node.getStart());
            let firstNewLineIndex = textBeforeNode.indexOf('\n');

            textBeforeNode = textBeforeNode.substring(firstNewLineIndex + 1, textBeforeNode.length);

            if (textBeforeNode.indexOf('\n') === -1) {
                addFailure = true;
            }
        }

        if (hasNextNode) {
            let textAfterNode = sourceFileText.substring(node.getEnd(), nextNode.getStart());
            let firstNewLineIndex = textAfterNode.indexOf('\n');

            textAfterNode = textAfterNode.substring(firstNewLineIndex + 1, textAfterNode.length);

            if (textAfterNode.indexOf('\n') === -1) {
                addFailure = true;
            }
        }

        if (addFailure) {
            let errorMsg = '';

            switch (node.kind) {
                case ts.SyntaxKind.IfStatement:
                    errorMsg = Rule.EMPTY_LINE_MISSING_IF_STATEMENT_STRING;
                    break;
                case ts.SyntaxKind.DoStatement:
                    errorMsg = Rule.EMPTY_LINE_MISSING_DO_STATEMENT_STRING;
                    break;
                case ts.SyntaxKind.WhileStatement:
                    errorMsg = Rule.EMPTY_LINE_MISSING_WHILE_STATEMENT_STRING;
                    break;
                case ts.SyntaxKind.ForStatement:
                    errorMsg = Rule.EMPTY_LINE_MISSING_FOR_STATEMENT_STRING;
                    break;
                case ts.SyntaxKind.ForInStatement:
                    errorMsg = Rule.EMPTY_LINE_MISSING_FOR_IN_STATEMENT_STRING;
                    break;
                case ts.SyntaxKind.ForOfStatement:
                    errorMsg = Rule.EMPTY_LINE_MISSING_FOR_OF_STATEMENT_STRING;
                    break;
                case ts.SyntaxKind.SwitchStatement:
                    errorMsg = Rule.EMPTY_LINE_MISSING_SWITCH_STATEMENT_STRING;
                    break;
                default:
                    break;
            }
            
            this.addFailureAt(node.getStart(), node.getWidth(), errorMsg);
        }
    }
}
