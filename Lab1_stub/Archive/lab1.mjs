//Name: Tri Luu
//Pledge: I pledge my honor that I have abided by the Stevens Honor System
const isPrime = (num) =>{
  if (num <2) {
    return false;
  }
  if (num == 2){
    return true;
  }
  for (let i = 2; i<num;i++){
    if (num % i == 0){
      return false;
    }
  }
  return true;
}
export const questionOne = (arr) => {
  // Implement question 1 here
  let sum = arr.reduce((total, i) => total + i ** 3, 0);
  let myObj = {}
  myObj[sum] = isPrime(sum)
  return myObj; //return result
};

export const questionTwo = (numArray) => {
  // Implement question 2 here
  for (let i = 1;i<numArray.length;i++){
    if (numArray[i-1] > numArray[i]) {
      return [false, i-1, i ]
    }
  }

  return [true]; //return result
};
//ask for spacing and edge cases
export const questionThree = (obj1, obj2) => {
  let result = {}
  for (const key in obj1) {
    result[key] = obj2.hasOwnProperty(key)
}
    for (const key in obj2) {
        if (!result.hasOwnProperty(key)) result[key] = obj1.hasOwnProperty(key)
}
  return result; //return result
};
//asks for object arrangement
export const questionFour = (string) => {
  // Implement question 4 here
  let result = [];
  let i = string.trim();
  for (const j of string.split('\n')) {
    let arr = []
    for (const k of j.split(',')){
      arr.push(k.trim())
    }
  result.push(arr)
}
  return result
};

export const studentInfo = {
  firstName: 'Tri',
  lastName: 'Luu',
  studentId: '20007629'
};
