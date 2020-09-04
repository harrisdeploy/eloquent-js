//Chapter 8 Bugs and Errors

/*

Language:
  - JS' looseness with its concept of bindings/properties is a hindrance,
  rarely catching typos before running program and even then, allows
  you to do a lot of nonsensical things via its flexibility (e.g. true * "monkey" <- this is valid)
  

  - The issue is that the program continues happily even if a previous function may have return 'NaN', hence the need for things like catching errors (e) and throwing
  
  
Strict Mode:
  - "use strict" on top of a file or function body
  - 'this' binding holds value 'undefined' in functions that are not called as methods, whereas outside of strict mode, 'this' usually ends up referring to the global scope object
  - Gets rid of certain problematic language features (make it a habit to use it from now on, Inshallah)
*/

function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

canYouSpotTheProblem();

// → ReferenceError: counter is not defined
//normally JS literally creates a global binding and the program would actually work!

/*
Types:
  - JS considers types only when running the program, sometimes tries to implictly convert values to types it expects too
  - Can utilise Javascript dialects that add types to the language and get our computer to check them for us, before even running our program (i.e. TypeScript)
  - Can add comments on function inputs such as:
*/
// (VilageState, Array) -> {direction: string, memory: Array}
function goalOrientedRobot(state, memory) {
  //...
}

/*
Testing:
  - Writing automative tests is more work than manual but saves you so much time in the long run (i.e. TDD)
  - Usually take form of little labeled programs that verify aspects of your code, for example:
*/
function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to uppercase", () => { //first one is label
  return "hello".toUpperCase() == "HELLO";  //second is body (function)
}); //
  
/*
  - However, constantly writing these tests produces awkward/repetitive code, hence exists 'test runners' which help you build/run collections of 'test suites' by providing a literal language
  - Encapsulation makes testing easier

Debugging:
  - There's the easy/obvious errors, and the not so obvious ones...
  - Sometimes it's an invalid value still being used
  - We need to resist the urge to make random trial and error tinkering with the code, rather need to THINK, analyse what's happening and come up with a theory of what's happening via observations (i.e. console.log), then test this theory (asserts) No theory? Additional observations.
  - Redo the cycle till gotten the solutions ^
*/

function numberToString(n, base = 10) {
  let result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }
  do {
    console.log(`result: ${result} = String(n % base)`
                +`: ${String(n % base)} + result`);
    //strategic console.log! Works.
    result = String(n%base) + result;
    console.log(`result: ${result} n: ${n}`);
    n /= base;
    console.log(`n /=base = ${n}`);
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…

/*With console.logs:
result:  = String(n % base): 3 + result
result: 3 n: 13
n /=base = 1.3
result: 3 = String(n % base): 1.3 + result
result: 1.33 n: 1.3
n /=base = 0.13
result: 1.33 = String(n % base): 0.13 + result
result: 0.131.33 n: 0.13
n /=base = 0.013000000000000001

  Clearly the problem is the n /=base = 3->1.3->0.13->and so on
  Doesn't produce a whole number. So we can add:
  n = Math.floor(n / base); so it rounds up or down

  - You can also use debugger capabilities of your browser, they come with
    the ability to set 'breakpoints' on a specific line of your code
  - When execution program reaches breakpoint, can pause and inspect value of bindings at that point.
  - Sometimes can be activated by inclding a 'debugger' statement in your program
  
  
Error Propagation:
  - Easier if you're developing only for yourself but for others, especially real world code, need to actively do something more than just crashing (i.e. keep running)
  - One option is that we can return a special value (null, undefined, -1)
*/

function promptNumber(question) {
  let result = Number(prompt(question));
  if (Number.isNan(result)) return null;
  else return result;
}
console.log(promptNumber("How many trees?"));

//null (if != Number)
/*
  - But what if a function can return different multiple kinds of values? Then you can try to 'wrap the result' in an object to be able to distinguish from success/failure
*/

function lastElement(array) {
  if (array.length == 0) {
    return {failed: true};
  } else {
    return {element: array[array.length - 1]};
  }
}

/*
Exceptions (exception handling):
  - When a function can't proceed, we'd like to just stop what we're doing and immediately jump to a place that knows how to handle the problem - 'exception handling'
  - When run into a problem, can 'raise' or 'throw' an exception, which can be any value
  - Exceptions are 'supercharged function returns', except they can also jump out of all its callers, all the way down to the first call that started the current execution  - 'unwinding the stack'
  - The power lies in setting 'obstacles' ALONG THE STACK to 'catch' the exception as it it's zooming down on it, once caught an exception you can do something with it to address the problem and continue the program
  - Error handling only necessary at potential points of errors, see below look() doesn't have it whereas promptDirection() does
*/

function promptDirection(question) {
  let result  = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result); //Error constructor is
  //a standard JS constructor that creates an object w/ a 'message' property
}

function look() {
  if (promptDirection("Which way") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

try { //try..catch block is specifically for error handling
  console.log("You see", look());
} catch (error) { //try and catch done in this format
  console.log(`Something went wrong: error: ${error}, error.message: ${error.message} and error.stack: ${error.stack}`); //stack trace
}

/*STACK TRACE:
  - (1) try
  - (2) look()
  - (3) promptDirection("Which way") -> Error thrown

THEN thrown: 3 -> 2 -> 1 (catch-ed)

Cleaning Up After Exceptions:
  - Effect of an exception is another kind of 'control flow', need to account for it, as every function call/property access might cause control to leave your code



*/

