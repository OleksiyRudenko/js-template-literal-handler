export const getParameters = func =>
  new RegExp('(?:' + func.name + '\\s*|^)\\s*\\((.*?)\\)')
    .exec(func.toString().replace(/\n/g, ''))[1]
    .replace(/\/\*.*?\*\//g, '')
    .replace(/ /g, '')
    .match(/[^,]+/g) || [];

export const getParametersCount = func => getParameters(func).length;

export function toBeOneOf(received, items = []) {
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
}
