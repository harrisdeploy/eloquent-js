//Chapter 8 Bugs and Errors
"use strict"
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
  - Error handling is only necessary at potential points of errors, see below look() doesn't have it whereas promptDirection() does
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
  - (1) try {}
  - (2) look()
  - (3) promptDirection("Which way") -> Error thrown

THEN thrown: 3 -> 2 -> 1 (caught)

Cleaning Up After Exceptions:
  - Effect of an exception is another kind of 'control flow', need to account for it, as every function call/property access might cause control to leave your code
  - For example, the effects of a disrupted control flow would be there via an exception thrown (and the preceding code still ran or something)


*/

const accounts = {
  a:100,
  b: 0,
  c: 20
};

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!accounts.hasOwnProperty(accountName)) {
//i.e. if the object doesn't have a property with that name (a, b, c etc)
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return; //if there's not enough money in the account
  accounts[from] -= amount;
//It transfers money FIRST
  accounts[getAccount()] += amount;
//checks if there's an aacount SECOND
//so if there's an error, and the entire code is stopped,
//then the money gets transferred into nothing, hence control flow disrupted
}

/*
  - A programming style that emphasises new values instead of changing existing data helps
  - Can use the 'finally' in the 'try' statement we have, a finally block says, "no matter what happens, run this code after trying to run the code in the try block"
*/

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }//so if it didn't get run (progress = 2), then revert the money back
  }
}
/*
  - Even if an exception thrown in the try block, whilst finally code has run, finally doesn't interfere with the exception, stack continues unwinding
  - Writing programs that operate reliably, though hard, is important - particularly how much damage your software will do when it fails
  
Selective Catching:
  - An unhandled exception is one that makes it all the way to the bottom of the stack without being caught, hence by the environment (i.e. console)
  - For unknown errors, unhandled exceptions is a reasonable way to signal a broken program and JS console will provide you information on it
  - For KNOWN errors, expected to happen during routine use, need to be caught properly
  - Don't blanket-catch exceptions unless purpose for 'routing' them over a network to signal a system crash
  - But how do we selectively catch or identify specific exceptions? JS doesn't allow provide a nuanced direct approach to selectively catching exceptions, either you catch them all or none
  - It can be tempting to assume that a specific try {} block is causing an exception but this needs proper data for identification
*/

for (;;) { //;; intentionally creates a loop that doesn't terminate on its own
  try {
    let dir = promtDirection"Where?"); //<- typo, will result in an 'undefined variable error'
    console.log("You chose ", dir);
    break;
  } catch (e) { //however since catch {} ignores its exception value (e), wrongly assumes the problem is an invalid direction input
    console.log("Not a valid direction. Try again");
  } //hence stuck in an infinite loop and (e) gets buried
} //time to define a new type of error and use instanceof to identify it

class InputError extends Error {} //inherits Error constructor, which expects a string message as argument, InputError objects behave like Error objects except that they have a DIFFERENT CLASS by which we can recognise them and hence identify specific exceptions

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}

for (;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log("Now a valid direction. Try again");
//hence will ONLY catch instances of InputError and let unrelated exceptions throw, if typo, then an undefined binding error (e) will properly be reported
    } else {
      throw e;
    }
  }
}

/*
Assertions:
  - Checks inside a program, to avoid silly mistakes, saves a LOT of time long run (TDD - Test Driven Development)
*/

function firstElement(array) {
  if (array.length == 0) { //can't return if array is empty
    throw new Error("firstElement called with []");
  }//instead of getting a silent returning undefined, the assert will loudly blow up program
  return array[0];
}

/*Summary:
  - Implement above in your code from now on, TDD, error handling, "strict", special values returning, experiment with futureautomated test suits, get normal with console.logging constantly - Bismillah

Exercises:
Retry:
*/

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  // Your code here.
  let value = 0;// = 0;
  try {
    value = primitiveMultiply(a, b);// == "Klunk")
   // if (Number.isNaN(value) return null;
    //reliableMultiply(a, b);
  //	console.log(`value is: ${value}`);
  } catch (e) {
    if (e.message == "Klunk") {
//        	console.log(`value is: ${value}`);

		return reliableMultiply(a, b);
    	//console.log(e.message);
    }
  }
//    	console.log(`value is: ${value}`);

  return value;
}
//console.log(primitiveMultiply(8, 8));

console.log(reliableMultiply(8, 8));
// → 64


//The Locked Box:
const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  // Your code here.
  //draft
  let unlocked = 0;
  if (box.locked === false) { //it's unlocked
    unlocked = 1;
    console.log("it's unlocked");
  }
  box.unlock();
  let value = 0;
  try {
      value = body();
  } finally {
    if (unlocked === 1) {
      box.unlock();
    }
    else {
      box.lock();
    }
  }

  if (unlocked === 1) {
    box.unlock();
  }
  else if (unlocked === 1) {
    box.lock();
  }  /*
  if (box.locked !== true) {
  	throw new Error("box.locked !== true");
  }*/
  return value;
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true
box.unlock();

withBoxUnlocked(function() {
  box.content.push("gold piece");
});
console.log(box.locked);
// → false



