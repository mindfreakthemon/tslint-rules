[![dependencies][deps-image]][deps-url] [![dev-dependencies][dev-deps-image]][dev-deps-url]

[![NPM][npm-image]][npm-url]

# tslint-rules

A set of custom [TSLint](https://github.com/palantir/tslint) rules.


# Usage

Install from npm to your devDependencies:
```
npm install --save-dev mws-tslint-rules
```

Configure tslint to use the mws-tslint-rules folder:

Add the following path to the `rulesDirectory` setting in your `tslint.json` file:

```json
{
   "rulesDirectory": [
     "node_modules/mws-tslint-rules/dist"
   ],
   "rules": {
     ...
   }
}
```

Now configure some of the new rules.


# Available Rules

## `empty-line-before-return-statement`

TODO

#### Rationale:

TODO

#### Usage:
```json
{
  "empty-line-before-return-statement": true
}
```

#### Options:

Not configurable.

## `empty-lines-at-block-statement`

TODO

#### Rationale:

TODO

#### Usage:
```json
{
  "empty-lines-at-block-statement": true
}
```

#### Options:

Not configurable.

## `empty-lines-at-variable-statement`

TODO

#### Rationale:

TODO

#### Usage:
```json
{
  "empty-lines-at-variable-statement": true
}
```

#### Options:

Not configurable.

## `ext-variable-name`

This rule provides extensive support for customizing allowable variable names
            for a wide variety of variable tags.  The rule is configured by setting up a
            list of sub-rules that specify the tags of variables to check and the checks
            to perform on the variable"s name.  The sub-rules are checked in order
            and the first one that matches the tags of variable being checked is the
            only one that is used.
            
An example set of sub-rules for an example coding standard is shown below.

#### Rationale:


#### Usage:
```json
{
	"ext-variable-name": [
		true,
		[
			"class",
			"pascal"
		],
		[
			"interface",
			"pascal",
			{
				"regex": "^I.*$"
			}
		],
		[
			"parameter",
			"camel"
		],
		[
			"property",
			"static",
			"camel",
			{
				"regex": "^s.*$"
			}
		],
		[
			"property",
			"private",
			"camel",
			"allow-leading-underscore"
		],
		[
			"property",
			"protected",
			"camel",
			"allow-leading-underscore"
		],
		[
			"variable",
			"local",
			"snake"
		],
		[
			"variable",
			"const",
			"upper"
		],
		[
			"variable",
			"camel",
			{
				"regex": "^g.*$"
			}
		],
		[
			"method",
			"private",
			"camel",
			"allow-leading-underscore"
		],
		[
			"method",
			"protected",
			"camel",
			"allow-leading-underscore"
		],
		[
			"function",
			"camel"
		],
		[
			"default",
			"camel"
		]
	]
}
```

#### Options:

 Allowed tags for variables:
 * primary (choose one):
 * class, interface, parameter, property,
 method, function, variable
 * modifiers (choose zero or more):
 * local, const, static, public, protected, private

 note: If any tags is added to a sub-rule then **all** must match the variable.

 Checks allowed:
 * One of:
 * "camel": Require variables to use camelCaseVariables
 * "snake": Require variables to use snake_case_variables
 * "pascal": Require variables to use PascalCaseVariables
 * "upper": Require variables to use UPPER_CASE_VARIABLES
 * "allow-leading-underscore": permits the variable to have a leading underscore
 * "allow-trailing-underscore": permits the variable to have a trailing underscore
 * "ban-keywords": bans a list of language keywords from being used
 * {"regex": "^.*$"}: checks the variable name against the given regex


## `sorting-import`

TODO

#### Rationale:

TODO

#### Usage:
```json
{
  "sorting-import": [
    true,
    {
      "orderImportType": ["NAMED", "SIDE_EFFECT", "NAMESPACE", "NAMED_WITHOUT_BRACKETS", "EQUALS"],
      "orderSortingType": "MAX_TO_MIN_LENGTH"
      
    }
  
  ]
}
```

#### Options:


For `orderImportType`, array of *all* the following in desired order:
* `"NAMED"` -  
* `"SIDE_EFFECT"` -  
* `"NAMESPACE"` -  
* `"NAMED_WITHOUT_BRACKETS"` -  
* `"EQUALS"` -  

For `orderSortingType`, one of the following:

* `"MAX_TO_MIN_LENGTH"` -
* `"MIN_TO_MAX_LENGTH"` -


## `types-in-method-declaration`

TODO

#### Rationale:

TODO

#### Usage:
```json
{
  "types-in-method-declaration": true
}
```

#### Options:

Not configurable.

## `whitespace-in-method-declaration`

TODO

#### Rationale:

TODO

#### Usage:
```json
{
  "whitespace-in-method-declaration": true
}
```

#### Options:

Not configurable.


# Contributions and Development

Issue reports and pull requests are highly welcome! Please make sure to provide sensible tests along with your pull request.

To get started with development, clone the project and run `npm install`.
To run the tests execute `npm test`.


[deps-image]: https://img.shields.io/david/mindfreakthemon/tslint-rules.svg?style=flat-square
[deps-url]: https://david-dm.org/mindfreakthemon/tslint-rules
[dev-deps-image]: https://img.shields.io/david/dev/mindfreakthemon/tslint-rules.svg?style=flat-square
[dev-deps-url]: https://david-dm.org/mindfreakthemon/tslint-rules?type=dev
[npm-image]: https://nodei.co/npm/mws-tslint-rules.png?downloads=true
[npm-url]: https://npmjs.org/package/mws-tslint-rules
