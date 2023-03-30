import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input
//Test cases for question 1
console.log(lab1.questionOne([0, 1, 1]));  
console.log(lab1.questionOne([2, 4, 1])); 
console.log(lab1.questionOne([123, 23, 1])); 
console.log(lab1.questionOne([0, 159, 7185])); 
console.log(lab1.questionOne([11, 9])); 

//Test cases for question 2
console.log(lab1.questionTwo([1, 3, 1]));  
console.log(lab1.questionTwo([1, 2, 4, 3, 2, 3, 4])); 
console.log(lab1.questionTwo([11, 8, 5, 11])); 
console.log(lab1.questionTwo([10,100,1000, 10000])); 
console.log(lab1.questionTwo([2]))
//Test cases for question 3
console.log(lab1.questionThree({a:1,b:2,c:3,d:4,e:5}, {c:10})); 

console.log(lab1.questionThree({a:1,b:2,c:3, d:4}, {f:10, e:30, d: 40, c:50, a:60, z:1, k:2})); 

console.log(lab1.questionThree({Hello: "world", cs546: "fun", cs545: "very fun", cs810: "cry"},{1: "okok", 2: "do this", cs546: 123, z: 100, cs810: 1000}))
 
console.log(lab1.questionThree({1: 'a', 2: 'b', 3: 'c', 4:'e'},{1: 'z', 2: 'a', 3: 'p', 4: 1000}));

console.log(lab1.questionThree({1: 'a', 2: 'b', 3: 'c', 4:'e'},{}));

//Test cases for question 4
console.log(lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570
Tri, Luu, cs546
hello, ok`));

console.log(lab1.questionFour(`Tri, Luu, cs392
Alim, Ha, cs546
Jacob, Rose,cs115`))
console.log(lab1.questionFour(`first, last
welcome, Home, cs546`))
console.log(lab1.questionFour(`first
Hello
welcome, Home, cs546`))
console.log(lab1.questionFour(`Yuxuan, Liu, Male
Tri, Luu, Male
Andy, Pinkman, Female
Walter, White, Male
Gus, Fring, Male
Star, Trek`))