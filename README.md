# JavaScript Template Literal Handler

An educational project to practise
[JavaScript template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
handling with a [tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Development](#development)
  - [The task](#the-task)
    - [Level 1](#level-1)
    - [Level 80](#level-80)
- [Project improvement and bug reporting](#project-improvement-and-bug-reporting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- generated with [DocToc](https://github.com/thlorenz/doctoc) -->

## Installation

The project requires [NodeJS v.14+ and npm](https://nodejs.org/en/download/)
installed.

Fork the project and clone it locally.

Run `npm i` to install required dependencies.

## Development

Check the requirements below and implement the features as requested.

You will add your implementation in [./src/transform.js](./src/transform.js)

Run `npm test` to see if your implementation meets requirements.

> Your code will be prettified and linted on commit.
> If linter reports code style errors then fix them.
> Fill free linting your code with `npm run lint` at
> any time during the development.

### The task

Implement [`transform`](./src/transform.js) function that being applied to
a template will return a string where every expression in
a template is transformed following the rules below:

- number - multiplied by 2 and incremented by 3 (e.g. 5 becomes 13)
- string - capitalized in a title capitalization style.
  Space, `,`, `.`, `;`, `!` and `?` are considered as word delimiters.
  (e.g. `a RED fox! cunning,SliCk and quick.`
  becomes `A Red Fox! Cunning,Slick And Quick.`)
- function - specified function gets called and expected to
  return its own name, all caps, (level 1);
  if you accept Level 80 challenge, then the capitalized function
  name should be supplemented with parenthesized
  next string fragment and next expression, both glued with '='
  (level 80)
- object - a JSON representation of a simple object
  (no circular references, Symbols, or functions as properties)
- anything else - let JS handle it

You may want to employ

- [String.prototype.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
  to transform strings (check [a function as a parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_a_parameter) section
  and make sure you use `g` flag for a matching RegExp).
- [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
  methods to implement objects transformation.

NB! [String.prototype.replaceAll](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
may not be supported by your/latest version of NodeJS.

#### Level 1

Implement [`transform`](./src/transform.js) function as per
requirements above.

Implement [`testFunction`](./src/transform.js) that expects
no parameters and returns its own name, all caps.

Examples:

```javascript
transform`a = ${5}`;
// 'a = 13'

transform`Let me tell you about ${'a RED fox! cunning,SliCk and quick.'} The end`;
// 'Let me tell you about A Red Fox! Cunning,Slick And Quick. The end'

transform`a = ${{ b: 5, c: 'def' }}`;
// 'a = {"b":5,"c":"def"}'

transform`a = ${testFunction}`;
// 'a = TESTFUNCTION'

transform`a = ${testFunction} value ${5}`;
// 'a = TESTFUNCTION value 13'

transform`Let me tell you about ${'a RED fox! cunning,SliCk and quick.'} The end.
  ${{ b: 5, c: 'def' }}
  a = ${testFunction} value Z ${5}`;
// 'Let me tell you about A Red Fox! Cunning,Slick And Quick. The end.
//   {"b":5,"c":"def"}
//   a = TESTFUNCTION value Z 13'
```

Feel free implementing any other helper functions that
`transform` and/or `testFunction` would use, as required.

#### Level 80

Implement [`transform`](./src/transform.js) function as per
requirements above.

Implement [`testFunction`](./src/transform.js) that expects
two parameters and returns its own name,
all caps, and next string fragment (whitespaces removed)
and next expression glued with '=', parenthesized. See example below.

NB! Next expression should be exposed as is,
without any transformations applied.

Examples:

```javascript
transform`a${5} = ${testFunction} value Z ${5}`;
// 'a = TESTFUNCTION(valueZ=5)'

transform`Let me tell you about ${'a RED fox! cunning,SliCk and quick.'} The end.
  ${{ b: 5, c: 'def' }}
  a${5} = ${testFunction} value Z ${5}`;
// 'Let me tell you about A Red Fox! Cunning,Slick And Quick. The end.
//   {"b":5,"c":"def"}
//   a13 = TESTFUNCTION(valueZ=5)'
```

## Project improvement and bug reporting

Found a bug in documentation or code?
Please report it via
[issues](https://github.com/OleksiyRudenko/js-template-literal-handler/issues).

Feel free opening PRs to fix
[issues](https://github.com/OleksiyRudenko/js-template-literal-handler/issues)
or otherwise improve the project.

Please note that this project doesn't accept pull requests
with task implementation code.
