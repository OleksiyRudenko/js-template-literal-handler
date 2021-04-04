import { level as implementationLevel, transform, testFunction } from './transform';
import { toBeOneOf, getParametersCount } from './utils';

expect.extend({ toBeOneOf });

const testFunctions = {
  1: () => 'TESTFUNCTIONLEVEL1',
  80: (a, b) => `TESTFUNCTIONLEVEL80(${a.replace(/ /g, '')}=${b})`,
};

const randomIntegers = [
  Math.ceil(Math.random() * 100000),
  Math.ceil(Math.random() * 100000),
  Math.ceil(Math.random() * 1000),
  Math.ceil(Math.random() * 1000),
];

const expectedResult = {
  1: `Let me tell you about a red fox! cunning,slick ${randomIntegers[1]}and quick. The end.
        ${randomIntegers[0] * 2 + 3}
        {"b":5,"c":"def"}
        ${randomIntegers[1] * 2 + 3}
        a${randomIntegers[2] * 2 + 3} = TESTFUNCTION value  Z ${randomIntegers[2] * 2 + 3} a
        TESTFUNCTIONLEVEL1 parameter A  19 ${randomIntegers[3] * 2 + 3}`,
  80: `Let me tell you about a red fox! cunning,slick ${randomIntegers[1]}and quick. The end.
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
      transform`Let me tell you about ${`a RED fox! cunning,SliCk ${randomIntegers[1]}and quick.`} The end.
        ${randomIntegers[0]}
        ${{ b: 5, c: 'def' }}
        ${randomIntegers[1]}
        a${randomIntegers[2]} = ${testFunction} value  Z ${randomIntegers[2]} a
        ${testFunctions[implementationLevel]} parameter A  19 ${randomIntegers[3]}`,
    ).toBe(expectedResult[implementationLevel]);
  });
});
