
export const createEvent = function () {
  return new function () {
    this.bindings = [];
    this.bind = (callback) => {
      this.bindings.push(callback);
    };
    this.emit = (value) => {
      this.bindings.forEach((binding) => {
        binding.apply(undefined, value);
      });
    };
  };
};
