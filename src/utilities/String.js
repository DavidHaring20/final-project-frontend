
export const nameToTag = function (name) {
  return name
    .replace(/([a-z])([A-Z])/, (match, a, b) => `${a}-${b}`)
    .replace(/([A-Z])([A-Z][a-z])/, (match, a, b) => `${a}-${b}`)
    .replace(/[^A-Za-z0-9]+/g, (match) => `-`)
    .toLowerCase()
  ;
};

export const flatten = function (object) {
  let result = {};
  Object.keys(object).forEach((key) => {
    if (typeof(object[key]) === 'object' && object[key] !== null) {
      let fields = flatten(object[key]);
      Object.keys(fields).forEach((field) => {
        result[key + '.' + field] = fields[field];
      });
      return;
    }
    result[key] = object[key];
  });
  return result;
};
