import { censorWords, palindromes, distance, sayHello } from "./stringUtils.js";
import { areObjectsEqual, calculateObject, combineObjects } from "./objectUtils.js";
import { merge,sortAndFilter, matrixMultiply } from "./arrayUtils.js";
/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
try {
    console.log(
        merge([3,0,"Lab2",2,"Aiden"], ["CS-546" ,"Computer Science",8,15], [6,3,"!Patrick",25,29])
    );
  } catch (e) {
    console.log(e);
  }
  try {
    console.log(
        merge([])
    );
  } catch (e) {
    console.log(e);
  }
  try {
    console.log(
        matrixMultiply([ [1,2], [3,3] ])
    );
  } catch (e) {
    console.log(e);
  }
try {
    console.log(
      palindromes([])
    );
  } catch (e) {
    console.log(e);
  }
  
try {
  console.log(
    palindromes([
      "123321",
      "lol",
      "Cu toe toe cu",
      "asdzxccxzasd",
      "Anna",
      "Nope",
    ])
  );
} catch (e) {
  console.log(e);
}
let badWords = ["I ", " say", "He"]
try {
    console.log(
      censorWords("Sometimes I just wanna say Hello",badWords)
    );
  } catch (e) {
    console.log(e);
  }
  
try {
  console.log(
    censorWords("    sd   ", [2, "wow"])
  );
} catch (e) {
  console.log(e);
}
try{
    console.log(
        distance("I want it to be now because I want now", "I", "now")
    )
} catch (e){
    console.log(e)
}
try{
    console.log(
        distance("Patrick", "Patrick", "Patrick")
    )
} catch (e){
    console.log(e)
}
const str1 = {a: {aa: "Hello", bb: "There", cc: "Class"}, b: 12, c: false, d: "Test"}
const str2  = {c: false, b: 12, d: "Test", a: {bb: "There", cc: "Class", aa: "Hello"}}

try {
    console.log(areObjectsEqual(str1, str2)); 
  } catch (e) {
    console.log(e);
  }

  try {
    console.log(areObjectsEqual([1,2],[3,5])); 
  } catch (e) {
    console.log(e);
  }
try{
    console.log(calculateObject({ a: {}, b: 7, c: false }, [(n => n+1)]))
} catch (e){
    console.log(e);
}
try{
    console.log(calculateObject({ x:2, y: 4, z: 5 }, [(n => n+1),(n => n*2)]))
} catch (e){
    console.log(e);
}
try{
    console.log(combineObjects({ a: 31, b: 25, c: 52 },
        { d: 'he', b: 9 },
        { e: 12, d: 2 }))
} catch (e){
    console.log(e);
}
try{
    console.log(combineObjects({ a: NaN, b: 25, c: 52 },
        { d: 'he', b: 9 },
        { e: 12, d: 2 },2))
} catch (e){
    console.log(e);
}
try{

    sayHello('Patrick');
  
  }catch(e){
  
    console.log(e);
  
  }
  
  try{
  
    sayHello();
  
  }catch(e){
  
    console.log(e);
  
  }
  
  try{
  
    sayHello(1,2);
  
  }catch(e){
  
    console.log(e);
  
  }
  
  try{
  
    sayHello('Patrick', 'Hill');
  
  }catch(e){
  
    console.log(e);
  
  }
  