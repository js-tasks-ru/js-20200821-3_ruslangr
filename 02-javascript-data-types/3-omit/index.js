/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  return Object.fromEntries(
    Object.entries(obj).filter(item => {
      for (let field of fields) {
        if (item[0] == field) {
          return false;
        }
      }
      return true;
    })
  );
};
