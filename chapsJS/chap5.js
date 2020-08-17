function hello(){

//Flattening
let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
console.log(arrays.reduce((x, y) => x.concat(y)));


//Your own loop
// Your code here.
function loop(n, test, update, action){
	while(test(n) === true){
		action(n);
      	n = update(n);
    }
/*
      if (test(n) === true){
          action(n);
          n = update(n);
      }
      else {
          return 0;
      }
*/
}
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1


//Everything
function every(array, test) {
  /*
  while (i < array.length){
    if (test(array[i]) === true){
      i++;
    } else if (test(array[i]) === false){
		return false;
    }
  }
  return true;
  */
  
  // Your code here.
  //SOME
  //use 'some' to check whether there's at least 1 value that's
 //opposite of 'test' - maybe !test();
  //need to reread the chapter, don't fully understand it
/*
  const test2 = x => {
  	if (test(x) === false){
      return false;
    } else {
		test(x);
    }
  }
*/
  //
  //console.log((test(array[0])));
  /*let i = 0;
   //     console.log(array[i]);

  //console.log(array[i]);
  while (i < array.length){
    // console.log(array[i]);
    //if (array[0]

    //if (array[0] === undefined && array.length===0){return true};
  	if (array.some(element => !test(element) === true)){
      return false;
    } else {
      i++;
    }
    return true;
  }
  */
  /* some = || whereas every = &&, how to convert || to &&?
  							a && b equals !(!a || !b)
                            every(a,b) = !(some(!a, !b))
  */
  
  //return array.some((element) => !(test(element)) === true);
  if (array.some(a => !test(a)) === true){
    return false;
  } else {
	return true;
  }
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

/*To build every on top of some, we can apply De Morgan’s laws, which state that a && b equals !(!a || !b).
This can be generalized to arrays, where all elements in the array match if there is no element in the array
that does not match.
*/

//Dominant writing direction
function dominantDirection(text) {
  // Your code here.
  /*
  	for each text seperated by a comma, calculate whether it's
    rtl or ltr or ttb,
		how?
		
  */
  let ltr, trl, ttb, i = 0;
  /*
  while (i < text.length){
  	if (
  }*/
  //console.log(textScripts(text));
  let hello = countBy(text, char => {
	let script = characterScript(char.codePointAt(0));
	return script ? script.name : "none";
  }).filter(({name}) => name != "none" );
  
  
  return console.log(hello);
  //console.log(countBy([1, 2, 3, 4, 5], n => n > 2));

  //console.log(characterScript(121));
}

//console.log(dominantDirection("Hello!"));
// → ltr

console.log(dominantDirection("Hey, مساء الخير"));
// → rtl

