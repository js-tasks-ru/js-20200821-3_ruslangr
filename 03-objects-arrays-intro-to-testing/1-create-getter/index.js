/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let props = path.split('.');
  return  (obj) => {
    let val = obj[props.shift()];
    if(val === undefined) return undefined;
    for(let prop of props){
      val = val[prop];
    }
    return val;
  }
}
