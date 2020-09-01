/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let sort_direction = (param == 'asc') ? 1 : -1;
  let new_arr = arr.slice();
  return new_arr.sort((a, b) => {
    if (a.toUpperCase().localeCompare(b.toUpperCase()) == 0) {
      return -a.localeCompare(b) * sort_direction;
    } else {
      return a.localeCompare(b) * sort_direction;
    }
  });
}

