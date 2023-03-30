/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {
    if (typeof string === 'undefined'){
        throw "array doesn't exist"
    }
    if (!Array.isArray(string)){
        throw "string isn't an array"
    }
    if (!string.length){
        throw "string is empty"
    }
    string.forEach(element => {
        if (typeof element !== 'string'){
            throw 'Each array element must be a string'
        }
        if (!/\w/.test(element)) {
            throw ('String must contain at least one alphanumeric character');
          }
    })
    
  let obj = {};
  let arr = string.map((str) => {
    let str_changed = str
      .toLowerCase()
      .split("")
      .filter((char) => char.match(/[0-9a-z]/))
      .join("");
    let str_reversed = str_changed.split("").reverse().join("");
    obj[str_changed] = str_changed === str_reversed;
  });
  return obj;
};
let censorWords = (string, badWordsList) => {
    let str = string.trim();
    if (typeof str !== 'string'){
        throw 'Input string is not found or is not a string'
    }
    if (!Array.isArray(badWordsList)){
        throw 'The bad words list must exists and is an array'
    }
    if (!badWordsList.length){
        throw 'Error: input string cannot be an empty string'
    }
    if (str.length == 0){
        throw 'Input string cannot be an empty string'
    }
    badWordsList.forEach(element =>{
        
        if (typeof element !== 'string'){
            throw 'Every element of badWordsList must be a string'
        }
        let ele = element.trim()
        if (!str.indexOf(ele)){
            throw 'Each element in the bad words list must exist in the input string'
        }
    })
  const replaced = ["!", "@", "$", "#"];
  let j = 0;

  let result = badWordsList.reduce((result, badWord) => {
    badWord = badWord.trim()
    let censor = "";
    let len = badWord.length;

    while (len != 0) {
      censor += replaced[j % 4];
      j++;
      len--; 
    }

    return result.replace(badWord, censor);
  }, str);
  return result;
};
let stripSpecialCharacters=(str) =>{
    return str.replace(/[.!\-,;/]/g, '').toLowerCase().trim();
  }
let distance = (string, word1, word2) => {
  
  if (typeof string !== 'string' && typeof word1 !== 'string' &&typeof word2 !== 'string' ){
    throw 'string, word1 and word2 must be all exist as a string'
  }
  let string1 = stripSpecialCharacters=(string)
   word1 = stripSpecialCharacters=(word1)
  word2 = stripSpecialCharacters=(word2)
  if (!string1.length || !word1.length || !word2.length){
    throw 'every string must not be empty or contains only punctuation symbols'
  }
  let str = string1.split(" ");
  if (str.length < 2){
    throw 'string must be at least two words long'
  }
  if (word1 == word2){
    throw 'could not be the same'
  }
  let index1 = -1,
    index2 = -1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === word1) {
      index1 = i;
    }
  }
  for (let i = index1; i < str.length; i++) {
    if (str[i] == word2) {
      index2 = i;
      break;
    }  
    
  }
  if (index1 == -1 || index2 == -1){
    throw 'word 1 and word 2 must exist in string'
  }
  return index2 - index1;
};
function sayHello(firstName, lastName) {

    if (!firstName) throw 'You must supply the first name parameter'
  
    if (!lastName) throw 'You must supply the last name parameter'
  
    if (typeof firstName  != 'string') throw 'First Name Must Be A String';
  
    if (typeof lastName  != 'string') throw 'Last Name Must Be A String';
  
     return `Hello ${firstName} ${lastName}!  How are you?`;
  
  }
  
export {
    distance,
    palindromes,
    censorWords,
    sayHello
}