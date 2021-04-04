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

const transformers = {
  number: n => n * 2 + 3 + '',
  string: s => s.toLowerCase(),
  stringer: s => capitalizeTitleStyle(s),
  function: f => f(),
  object: o => JSON.stringify(o),
};

function capitalizeTitleStyle(string) {
  return string.replace(/[^,.?; ]+/g, s => s[0].toUpperCase() + s.slice(1).toLowerCase());
}

export function transformItem(item) {
  const type = typeof item;
  return transformers[type] ? transformers[type](item) : item;
}
