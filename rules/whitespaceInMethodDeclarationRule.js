"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require('tslint/lib/lint');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoSpaceInMethodDeclarationWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_METHOD_STRING = 'White space is not allowed between method name and ()';
    Rule.FAILURE_FUNCTION_STRING = 'There must be whitespace between function and ()';
    Rule.FAILURE_NAMED_FUNCTION_STRING = 'White space is not allowed between function name and ()';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoSpaceInMethodDeclarationWalker = (function (_super) {
    __extends(NoSpaceInMethodDeclarationWalker, _super);
    function NoSpaceInMethodDeclarationWalker() {
        _super.apply(this, arguments);
    }
    NoSpaceInMethodDeclarationWalker.prototype.visitMethodDeclaration = function (node) {
        var methodName = node.name.getText();
        var methodBody = node.body.getText();
        var methodText = node.getText();
        var methodDeclaration = methodText.replace(methodBody, '');
        var regExp = new RegExp(methodName + "\\(");
        if (!regExp.test(methodDeclaration)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_METHOD_STRING));
        }
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    NoSpaceInMethodDeclarationWalker.prototype.visitFunctionDeclaration = function (node) {
        var isAnonymous = !node.name;
        var methodName = isAnonymous ? 'function ' : node.name.getText();
        var methodBody = node.body.getText();
        var methodText = node.getText();
        var methodDeclaration = methodText.replace(methodBody, '');
        var regExp = new RegExp(methodName + "\\(");
        var errorMsg = isAnonymous ? Rule.FAILURE_FUNCTION_STRING : Rule.FAILURE_NAMED_FUNCTION_STRING;
        if (!regExp.test(methodDeclaration)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), errorMsg));
        }
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    NoSpaceInMethodDeclarationWalker.prototype.visitFunctionExpression = function (node) {
        var isAnonymous = !node.name;
        var methodName = isAnonymous ? 'function ' : node.name.getText();
        var methodBody = node.body.getText();
        var methodText = node.getText();
        var methodDeclaration = methodText.replace(methodBody, '');
        var regExp = new RegExp(methodName + "\\(");
        var errorMsg = isAnonymous ? Rule.FAILURE_FUNCTION_STRING : Rule.FAILURE_NAMED_FUNCTION_STRING;
        if (!regExp.test(methodDeclaration)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), errorMsg));
        }
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    return NoSpaceInMethodDeclarationWalker;
}(Lint.RuleWalker));
