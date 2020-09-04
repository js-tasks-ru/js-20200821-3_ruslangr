/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let strCopy = string;
  const uniques = new Set(strCopy.split(''));
  for(let char of uniques){
    let reStr = `${char}{${size},}`;
    let re = new RegExp(reStr, "gi");
    strCopy = strCopy.replace(re, char.repeat(size));
  }
  return strCopy;
}
