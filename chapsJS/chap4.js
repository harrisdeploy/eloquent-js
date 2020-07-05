/*
  Write a range function that takes two arguments, start and end, and returns an array
  containing all the numbers from start up to (and including) end.

Next, write a sum function that takes an array of numbers and returns the sum of these numbers.
Run the example program and see whether it does indeed return 55.

As a bonus assignment, modify your range function to take an optional third argument
 that indicates the “step” value used when building the array. If no step is given,
  the elements go up by increments of one, corresponding to the old behavior.
  The function call range(1, 10, 2) should return [1, 3, 5, 7, 9].
  Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
*/


function sumOfRange(){
  document.getElementById("sumOfRange").innerHTML = "";

  
  /*ASSERTS:
  
  if (step === "negative"){
    then start > end;
  }
  else if (step === "positive"){
    then start < end;
  }
  
  */
 let start = parseInt(document.getElementById("start").value);
 let end = parseInt(document.getElementById("end").value);
 let step = parseInt(document.getElementById("step").value);


  if (step === undefined){
    step = 1;
  }
  
  let array = [], i = 0;

  if(step > 0){
    while (start < end){
      if (i === 0){
        array[i] = start;
      //  document.getElementById("sumOfRange").innerHTML = array[i] + "\n";
        i++;
      //  console.log("i:" + i + "start:" + start + "step:" + step + "end:" + end);
      } else {
        start = start + step;
        array[i] = start;
      //  document.getElementById("sumOfRange").innerHTML = array[i] + "\n";
        i++;
      //  console.log("i:" + i + "start:" + start + "step:" + step + "end:" + end);
      }
    }
  } else if( step < 0){ //(5, 2, -1) produces [5, 4, 3, 2].
      while (start > end){
        if (i === 0){
          array[i] = start;
        //  document.getElementById("sumOfRange").innerHTML = array[i] + "\n";
          i++;
        //  console.log("i:" + i + "start:" + start + "step:" + step + "end:" + end);
        } else {
          start = start + step;
          array[i] = start;
        //  document.getElementById("sumOfRange").innerHTML = array[i] + "\n";
          i++;
        //  console.log("i:" + i + "start:" + start + "step:" + step + "end:" + end);
        }
      }
  }

  for (let j = 0, sum = 0; j < array.length; j++){
    document.getElementById("sumOfRange").innerHTML += array[j] + "\n";
    sum = sum + array[j];
    if (j === (array.length-1)){
      document.getElementById("sumOfRange").innerHTML += "Sum: " + sum;
    }
  }

  //console.log(array); //replace w/ text
  /*

  let form = document.querySelector("form");
  form.addEventListener("submit", event => {
    console.log("Saving value", form.elements.value.value);
    event.preventDefault();
  });
  */
}

function reverseArray(arrayValue){
  //let arrayValue = parseInt(document.getElementById("reverseArrayInput").value);

  console.log("Before: " + arrayValue);

/* STOP MAKING THINGS DIFFICULT FOR YOU,
  figure out model first, then controller/view
  
  console.log(reverseArray(["A", "B", "C"]));
  // → ["C", "B", "A"];
  let arrayValue = [1, 2, 3, 4, 5];
  reverseArrayInPlace(arrayValue);
  console.log(arrayValue);
  // → [5, 4, 3, 2, 1]
*/

  let newArray = [];

  for (let i = 0; i < arrayValue.length; i++){
 //   console.log(arrayValue[(arrayValue.length - 1) - i]);
    newArray[i] = arrayValue[(arrayValue.length - 1) - i];
//    console.log(newArray[i]);
  }

  console.log("After: " + newArray);
}

function reverseArrayInPlace(arrayValue){
  console.log("Before: " + arrayValue);

/*
  reverseArrayInPlace(arrayValue);
  console.log(arrayValue);
  // → [5, 4, 3, 2, 1, 0]
*/

  //if i >arrayValue.length/2 =
  //if i < j, then stop (try w/ arrayValue.length ==even)
  //
  let j = arrayValue.length - 1, temp = 0;//, i = 0;
  
  for (let i = 0; i < j; i++){
    temp = arrayValue[i];
    arrayValue[i] = arrayValue[j];
    arrayValue[j] = temp;
    
    j--;
  }
  
  console.log("After: " + arrayValue);
}

function arrayToList(arrayInput){
  console.log(arrayInput);

/*
  console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
*/
  let i = 0;
  let objectOutput = {
    value: null,
    rest: null
  }
//    console.log(objectOutput);

  let temp =  objectOutput;
//          console.log(temp);

  
  for (i = 0; i < arrayInput.length; i++){
//    console.log(" arrayInput: " + arrayInput[i]);
    if (temp.value === null){
      temp.value = arrayInput[i];
//      console.log(temp);

      temp.rest = {
        value: null,
        rest: null
      }
      temp = temp.rest;
//      console.log(temp);

    }
//    console.log(temp);

//    console.log(objectOutput);

  }
  
  console.log(objectOutput);
}

function listToArray(listInput){
  console.log(listInput);
  
  let temp = listInput, array = [], i = 0;
  temp.value;
  
  while (temp.value !== null){
    array[i] = temp.value;
    i++;
    if (temp.rest !== null){
      temp = temp.rest;
    } else if (temp.rest === null){
      break;
    }
  }
  
  console.log(array);
}

function prepend(number, list){
/*
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
*/

  let newList = {value: number, rest: list};
  console.log(newList);
  
  return newList;
}

function nth(list, number){
  
  let counter = 0, temp = list;
  
  while (counter <= number){
    if (counter === number){
//      console.log(temp);
      return temp.value;
    }else {
      counter++;
//    console.log(temp);
      if (temp.rest !== null){
        temp = temp.rest;
      }
      else if (temp.rest === null){
        return undefined;
      }
    }
  }
}

  function recursiveNth(list, number){
    if (number !== 0){
//      console.log("    if (number !== 0){");
      if (list.rest !== null){
//              console.log("if (list.rest !== null){");

        list = list.rest;
        number--;
        return recursiveNth(list, number);
        //kept getting 'undefined reutrn' due to lack of return on original
        //recursiveNth(list, number) ^^ above
      }
      else if (list.rest === null){
//        console.log("aaand");
        return undefined;
      }
    }
    else if (number === 0){
//      console.log("else if (number === 0");
//      console.log(list.value);
      return list.value;
    }
  }
  
  
function deepEqual(input1, input2){
  if (input1 === input2){
    return true;
    
  } else if (input1 !== input2){
    return false;

  } else if (typeof(input1) !== typeof(input2)){
    return false;
    
  } else { //input1 = object, input2 = object -> deepEqual
    let properties1 = Object.keys(input1),
        properties2 = Object.keys(input2),
        i = 0;
        
    if (properties1.length !== properties1.length){
      return false;
      
    }
    
    while (i < properties1.length){
      if (deepEqual(properties1[i], properties2[i]) === true){
        i++;
      
      } else if (deepEqual(properties1[i], properties2[i]) === false){
        return false;
      
      }
    }
    
    return true;
  }
}
  
  
  
  