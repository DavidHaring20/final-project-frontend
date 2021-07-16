
export const filter = function (object, callback, self) {
  return Object.keys(object)
    .map((key) => [object[key], key])
    .filter(args => callback.apply(self, args))
    .reduce((obj, args) => {
      obj[args[1]] = object[args[1]];
      return obj;
    }, {})
  ;
};
