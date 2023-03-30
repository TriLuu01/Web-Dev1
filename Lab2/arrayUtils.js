/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  let result;
  let arr = array;
  if (sortBy1.trim() === "asc") {
    arr.sort((a, b) => {
      if (sortBy1[1] == "asc") {
      }
      return a[sortBy1[0]] - b[sortBy1[0]];
    });
    //   result = arr.filter((x)=> x[filterBy] === filterByTerm )
    return arr; //return an array that is sorted
  }
};

function merge(...args) {
  if (!args.length) {
    throw 'At least one array must be supplied';
  }

  for (let i = 0; i < args.length; i++) {
    if (!args[i].length) {
      throw 'Each array must have at least one element';
    }
    for (let j = 0; j < args[i].length; j++) {
      const element = args[i][j];

      if (Array.isArray(element)) {
        args.push(element);
      } else {
        if (typeof element !== 'string' && typeof element !== 'number') {
          throw 'Each array element is either a string, number or an array that has either strings or numbers as elements.';
        }
      }
    }
  }

  const arr = args.flat();
  let numbers = arr.filter((element) => typeof element === 'number');
  let strings = arr.filter((element) => typeof element === 'string');
  strings = strings.map((str) => str.trim());
  numbers.sort((a, b) => a - b);
  strings.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

  return numbers.concat(strings);
}

let matrixMultiply = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  if (args.length <2) {
    throw 'must have at least 2 inputs'
  }
  args.forEach(element =>{
    if (!Array.isArray(element)){
      throw 'each input is an array'
    }
    if (!element.length){
      throw 'each array must not be empty'
    }
    element.map(x=> {if (!Array.isArray(x)){
        throw 'outer array must contains only arrays'
    }})})
  }
  
export{
  sortAndFilter,
  merge,
  matrixMultiply
}
