/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let uniques = new Set(string.split(''));
  for(let char of uniques){
    let re_str = `${char}{${size},}`;
    let re = new RegExp(re_str, "gi");
    string = string.replace(re, char.repeat(size));
  }
  return string;
}
