import { transform, testFunction } from './transform80';

const getParameters = func =>
  new RegExp('(?:' + func.name + '\\s*|^)\\s*\\((.*?)\\)')
    .exec(func.toString().replace(/\n/g, ''))[1]
    .replace(/\/\*.*?\*\//g, '')
    .replace(/ /g, '')
    .match(/[^,]+/g) || [];
const getParametersCount = func => getParameters(func).length;

expect.extend({
  toBeOneOf(received, items = []) {
    const pass = items.includes(received);
    const message = () => `expected ${received} to be contained in array [${items}]`;
    if (pass) {
      return {
        message,
        pass: true,
      };
    }
    return {
      message,
      pass: false,
    };
  },
});

const testFunctionLevel1 = () => 'TESTFUNCTIONLEVEL1';
const testFunctionLevel80 = (a, b) => `TESTFUNCTIONLEVEL80(${a.replace(/ /g, '')}=${b})`;

const implementationLevel = testFunction.length ? 80 : 1;
const testFunctions = {
  1: testFunctionLevel1,
  80: testFunctionLevel80,
};
const randomIntegers = [
  Math.ceil(Math.random() * 100000),
  Math.ceil(Math.random() * 100000),
  Math.ceil(Math.random() * 1000),
  Math.ceil(Math.random() * 1000),
];
const expectedResult = {
  1: `Let me tell you about A Red Fox! Cunning,Slick And Quick. The end.
        ${randomIntegers[0] * 2 + 3}
        {"b":5,"c":"def"}
        ${randomIntegers[1] * 2 + 3}
        a${randomIntegers[2] * 2 + 3} = TESTFUNCTION value  Z ${randomIntegers[2] * 2 + 3} a
        TESTFUNCTIONLEVEL1 parameter A  19 ${randomIntegers[3] * 2 + 3}`,
  80: `Let me tell you about A Red Fox! Cunning,Slick And Quick. The end.
        ${randomIntegers[0] * 2 + 3}
        {"b":5,"c":"def"}
        ${randomIntegers[1] * 2 + 3}
        a${randomIntegers[2] * 2 + 3} = TESTFUNCTION(valueZ=${randomIntegers[2]}) a
        TESTFUNCTIONLEVEL80(parameterA19=${randomIntegers[3]})`,
};

describe("Functions' signatures", () => {
  test('transform function signature provides for at least 2 parameters', () => {
    expect(getParametersCount(transform)).toBeGreaterThanOrEqual(2);
  });
  test('testFunction function signature provides for 0 or 2 parameters', () => {
    expect(getParametersCount(testFunction)).toBeOneOf([0, 2]);
  });
});

describe('transform function implementation', () => {
  it('should transform numbers, strings, objects and functions as expected', () => {
    expect(
      transform`Let me tell you about ${'a RED fox! cunning,SliCk and quick.'} The end.
        ${randomIntegers[0]}
        ${{ b: 5, c: 'def' }}
        ${randomIntegers[1]}
        a${randomIntegers[2]} = ${testFunction} value  Z ${randomIntegers[2]} a
        ${testFunctions[implementationLevel]} parameter A  19 ${randomIntegers[3]}`,
    ).toBe(expectedResult[implementationLevel]);
  });
});
