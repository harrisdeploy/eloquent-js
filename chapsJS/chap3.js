/*

//Chap3

// Your code here.

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

*/
/*

maybe have a single printing bridge function between html and js code, that way I can
get my user inputs/outputs separately while having the vanilla JS code exercises. have a
uniform framework across all the code


function inputAndOutput(){
  printMinimum(x, y)
  
}

*/


function printMinimum(){
  //let input = window.prompt("What is the first number?", "x");
  let x = parseInt(window.prompt("What is the first number?", "x")),
      y = parseInt(window.prompt("What is the second number?", "y"));
//  console.log(`input: ${input} and x: ${x} and y: ${y}`);
  
  let content = "";
  document.getElementById("minimum").innerHTML = content;

  
  if (Number.isInteger(x) === false && Number.isInteger(y) === false){
    window.prompt("Please enter both as numbers!");
    printMinimum();
    //x = parseInt(input[0]); y = parseInt(input[2]);
  }
  
  else if (Number.isInteger(x) === true && Number.isInteger(y) === true){
    if (x < y){
      content = x + " is smaller than " + y;
      document.getElementById("minimum").innerHTML = content;
    } else if (y < x){
      content = y + " is smaller than " + x;
      document.getElementById("minimum").innerHTML = content;
    } else {
      content = x + " and " + y + " are the same";
      document.getElementById("minimum").innerHTML = content;
    }
  }
    
}

function printRecursion(){
  let x = parseInt(window.prompt("What number do you want to find is Even or Odd?", "x"));
  
  let content = "";
  document.getElementById("recursion").innerHTML = content;

  
  if (Number.isInteger(x) === false){
    x = parseInt(window.prompt("Please enter a number!"));
    printRecursion();
  }
  
  else if (Number.isInteger(x) === true){
    let y;
    
    if (x < 0){
       y = x*-1;
    } else {
      y = x;
    }
    //recursive function needed
//    console.log(`isEven: ${isEven(x)} and x: ${x}`);
  
    let content = `${x} is ${isEven(y)}`;
    document.getElementById("recursion").innerHTML = content;
  }
  
  function isEven(y){
    if (y !== 0 && y !== 1){
//      console.log(y);
      y = y - 2;
      return isEven(y);
    }
    else if (y === 0){
      //console.log("even");
      return "even";
    }
    else if (y === 1){
  //    console.log("odd");
      return "odd";
    }
  }
}

function printBeanCounting(){
/*
// Your code here.

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4
*/

  let content = "";
  document.getElementById("beancounting").innerHTML = content;

  let string = window.prompt("Which String?", "String")
  let character = window.prompt("Which Character?", "x");

  
  let counter = 0, tracker = 0;
    while (counter < string.length){
      if (character == string[counter]){
        tracker++;
        counter++;
      } else {
        counter++;
      }
    }
    content = `There are ${tracker} ${character}'s in ${string}`;
    document.getElementById("beancounting").innerHTML = content;

//    console.log(`There are ${tracker} ${character}'s in ${string}`);
}