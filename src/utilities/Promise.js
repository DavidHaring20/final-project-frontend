
export const promiseAll = async function (object) {
  let values = await Promise.all(Object.values(object));
  return Object.keys(object).reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
};

export const promiseEach = async function (promises, callback) {
  await Promise.all(promises.map((promise, index) => (async () => { callback(await promise, index); })()));
};

export const promiseEachOrdered = async function (promises, callback) {
  let priorityPromise = Promise.resolve();
  promises.forEach((promise, index) => {
    priorityPromise = (async () => {
      await priorityPromise;
      callback(await promise, index);
    })();
  });
  await priorityPromise;
};
