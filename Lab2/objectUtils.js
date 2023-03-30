

/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/



    
    let areObjectsEqual = (...args) => {
      if (!args) {
        throw "Input doesn't exist";
      }
    
      args.forEach((object) => {
        if (
          typeof object !== "object" ||
          Array.isArray(object) ||
          object === null
        ) {
          throw "One of the inputs is not an object";
        }
      });
    
      if (args.length < 2) {
        throw "There must be at least two objects passed into the function";
      }
    
      const trimObjectValues = (obj) => {
        if (typeof obj !== "object" || obj === null) {
          return obj;
        }
    
        const trimmed = {};
    
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (typeof obj[key] === 'string'){
                  trimmed[key.trim()] = trimObjectValues(obj[key]).trim();
            }
            
          }
        }
    
        return trimmed;
      };
    
      const isEqual = (obj1, obj2) => {
        if (obj1 === obj2) {
          return true;
        }
    
        if (typeof obj1 !== "object" || typeof obj2 !== "object") {
          return false;
        }
    
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
          return false;
        }
        
        for (const key in obj1) {
          if (!obj2.hasOwnProperty(key)) {
            return false;
          }
          if (obj1[key] !== obj2[key]) {
            return false;
          } 
          if (!isEqual(obj1[key], obj2[key])) {
            return false;
          }
        }
    
        return true;
      };
    
      for (let i = 0; i < args.length - 1; i++) {
            let x = trimObjectValues(args[i]);
            let y = trimObjectValues(args[i + 1]);
        if (!isEqual(x,y)) {
          return false;
        }
      }
    
      return true;
    };
    
          

let calculateObject = (object, funcs) => {
    if (typeof object !== 'object' ||
    Array.isArray(object) ||
    object === null){
      throw 'object must be an object'
    }
    if (!Array.isArray(funcs)){
      throw 'funcs must be an array'
    }
    Object.values(object).forEach(element =>{
      if (typeof element !== 'number'){
            throw 'object values must be all numbers'
      }
      if (isNaN(element)) {
            throw `object value is NaN`;
          } 
    })
      if (funcs.length <1){
            throw 'funcs must has at least one element'
      }
    funcs.forEach(element => {if (typeof element !== 'function'){
            throw 'funcs element must be all function'
    }}
    )
    
      let vals = Object.values(object);
    for (let i = 0; i<funcs.length;i++){
        vals = vals.map(funcs[i])
    }
    let i = 0;
    for (const key in object){
        object[key] = vals[i].toFixed(2)
        i++
    }
    return object
};
let combineObjects = (...args) => {
      if (args.length < 2) {
          throw "args must have at least two objects";
      }
      
      args.forEach(element => {
          if (typeof element !== 'object' ||
          Array.isArray(element) ||
          element === null) {
              throw `provided variable must be an object`;
          }
  
          if (Object.keys(element).length < 1) {
              throw `object must have at least one key`;
          }
          
      });
      let arr = args.reduce((result, element) => {
          result = result.concat(Object.keys(element));
          return result;
      }, []);
  
      let duplicates = {};
      arr.forEach(key => {
          if(arr.indexOf(key) !== arr.lastIndexOf(key)) {
              duplicates[key] = args.find(obj => obj[key] !== undefined)[key];
          }
      });
      return duplicates;
  };
export{
      areObjectsEqual,
      calculateObject,
      combineObjects
}