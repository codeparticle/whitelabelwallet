/**
 * Helper Function - Composes a Promise out of multiple chained Promises
 * lifted from: https://hackernoon.com/lets-compose-promises-309a63225f8a
 *
 * @param {...Promise} functions - promises that run in succession
 * @returns (Promise) Promise object
 */

const composePromise = (...functions) =>
  initialValue =>
    functions.reduceRight(
      (sum, fn) => Promise.resolve(sum).then(fn),
      initialValue
    );

export { composePromise };
