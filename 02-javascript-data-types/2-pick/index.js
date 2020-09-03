/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const arr = Object.entries(obj).filter(item => {
    for (let field of fields) {
      if (item[0] === field) {
        return true;
      }
    }
  });
  const res = Object.fromEntries(arr);
  return res;
};
