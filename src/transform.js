import { transformItem } from './utils';

// assign 80 once you accept a challenge to implement Level 80 requirements
export const level = 80;

/*
  Add parameters as appropriate.
  Should allow arbitrary number of expressions.
  Should work with arbitrary function expressions passed.
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
*/
export const transform =
  level === 1
    ? function (strings, ...expressions) {
        const expressionsLength = expressions.length;
        return strings
          .map((string, index) => [
            string,
            index < expressionsLength ? transformItem(expressions[index]) : '',
          ])
          .flat()
          .join('');
      }
    : function (strings, ...expressions) {
        const expressionsLength = expressions.length,
          stringsLength = strings.length,
          output = [];
        for (let index = 0; index < stringsLength; index++) {
          output.push(strings[index]);
          if (index < expressionsLength) {
            if (typeof expressions[index] === 'function') {
              output.push(expressions[index](strings[index + 1], expressions[index + 1]));
              index++;
            } else {
              output.push(transformItem(expressions[index]));
            }
          }
        }
        return output.join('');
      };

/*
  Level 1: expects no parameters. Returns its own name capitalized.
  Level 80: expects 2 parameters. Returns its own name capitalized and both parameters' values appended to it.
 */
export const testFunction =
  level === 1
    ? function () {
        return 'TESTFUNCTION';
      }
    : function (a, b) {
        return `TESTFUNCTION(${a.replace(/ /g, '')}=${b})`;
      };
