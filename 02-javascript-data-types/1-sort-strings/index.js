/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortDirection = (param === 'asc') ? 1 : -1;
  const newArr = arr.slice();
  return newArr.sort((a, b) =>
    sortDirection * a.localeCompare(b, 'default', {caseFirst: "upper"}));
}

