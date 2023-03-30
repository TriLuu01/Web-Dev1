/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

  let checkIsProperArray = (val, variableName) =>  {
    if (typeof val === 'undefined'){
      throw `${variableName || 'provided array'} is not defined`;
    }
    if (typeof val !== 'array'){
      throw `${variableName || 'provided array'} is not an array`;
    }
    if (val.length === 0){
      throw `${variableName || 'provided array'} is empty`;
    }
  }
  let checkObjects = (val, variableName) =>{
    val.forEach((x)=> {
      if (typeof x !== 'object'){
        throw `${variableName || 'provided array'} is not an object`;
      }
      if (Object.keys(x).length === 0){
        throw `${variableName || 'provided array'} is an empty object`;
      }
      if (Object.keys(x).length < 2){
        throw `${variableName || 'provided array'} is not fully supplied`;
      }
      //all objects in the array parameter have all the same keys.
    }
    )
  }
  let checkOrder = (val, variableName) =>{
    if (val != 'asc' || val != 'desc'){
      throw `the order of ${variableName || 'provided variable'} must be either 'asc' or 'desc'`;
    }
  }

  export{
    checkIsProperArray,
    checkObjects,
    checkOrder
  }