//chap6.js

/*NOTES:

  - JS Object Oriented programming: core idea to have bits of code isolated
    from each other
    
 
Encapsulation:
  - Different pieces of the program interact with each other through 'interfaces',
    which are limited sets of functions/bindings at an abstract level
    (hiding precise implementation)
  - Objects have their interfaces as specific set of methods/properties, public properties
    are part of the interface, private ones are outside (i.e. implemented)
  - Seperating interfaces from implementation (i.e. implemented code) is called 'Encapsulation'

  - JS doesn't have an official means to distinguish between private/public properties
    but described in documentation/comment and '_privateProperty' format to showcase
    a property is private

Methods:
  - Properties that hold function values, usually does something with the object it was called
  upon and the '.this'(which is a kind of extra parameter passed in a different way) points to
  the object it was called upon.
  
  let harris = {type: "normal", speak}; //object hence the the curly braces
  let hungryHarris = {type: "hungry", speak};
  
  harris.speak = function(line) {
      console.log(`The ${this.type} harris says '${line}'`);
  };
  
  
  harris.speak("I am not a robot.");
  hungryHarris.speak("I am hungry.");
  
  let coolHarris = {};
  
  speak.call(coolHarris, "Yo, I am cool", "cool");
  //another, explicit way of using the function's '.call' method for sending the '.this' parameter
  //will automatically take the available parameters ^^
  
Prototypes:
  - Every Object (even functions, arrays etc) has a 'prototype' Object as a backup, alongside its
    usual properties, with its own 'prototype' properties
    
  console.log(Object.getPrototypeOf(Function.prototype) == Object.prototype); //true
  console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
  
  - Can use 'Object.create' to either set or create prototypes to our Objects and hence we can use
    this for Javascript Classes...

Classes:
  - A Class defines the shape of a TYPE of object (methods/properties it has) which is an 'Instance' of the Class
  - Hence Prototypes are the Javascript means we use to create Classes, creating instances of the
    same Class which share the same methods (hence same values)
  - But need to make sure you're creating it in the right fashion, has the right properties that
    instances of this Class are supposed to have, leading to Constructor functions...
    
Constructors:
  let protoHarris = {
    speak(line){
      console.log(`Hi, I am ${this.type} Harris, and I say '${line}'`);
    }
  }

  function makeHarris(type) {
    let harris = Object.create(protoHarris);
    harris.type = type;
    return harris;
  }
  
  let coolHarris = makeHarris("cool").speak("Yo!");
  
  - Javascript has a way to make defining the Constructor function easier
  - If you put the keyword 'new' in front of a function call, the function is treated as a constructor
  - Constructors are always Capitalised
  
  function Harris(type){
    this.type = type;
  }
  Harris.prototype.speak = function(line){
    console.log(`The ${this.type} harris says '${line}'`);
  };
  
  let weirdHarris = new Harris("weird");
  weirdHarris.speak("I think JS is an alright language"); //woah, weirdo!
  
  
Class Notation (how to write Classes after 2015):
  class Harris(){ //class keyword allows us to define (only methods, not non-function values)
                  //methods in one place
    constructor(type){ //the constructor method is special, provides the actual Constructor
      this.type = type;//function as before
    }
    speak(line) {
      console.log(`The ${type} harris says '${line}'`);
    }
  }

  let killerHarris = new Harris("killer");
  killerHarris.speak("roar!"); //The killer harris says 'roar!'
  
  - You can override prototype properties during the Object instance: "overriding can be used to express exceptional properties in instances of a more generic class of objects, while letting the nonexceptional objects take a standard value from their prototype"
  
  - 'map' isn't just a higher function but also a data structure where it associates values (keys) with other values, however due to Object.prototype.values, other 'keys' become apparent and hence it defeats the purpose
  
  console.log("Is toString's age known?", "toString" in ages);
  // → Is toString's age known? true
  
  To solve this, you can use Object.create(null) or better yet the JS inbuilt 'new Map' class instead
  
Polymorphism:
  - When a piece of code is written to work with objects of a certain kind of interface
  - JS For/of loop earlier showcased how you could use the loop amongst different data structures by expecting a certain kind of interface across them all
  - We can try to employ this for our own too, but first Symbols...
  
Symbols:
  - Though property names are usually strings, they can also be Symbols, which are basically unique values created with the Symbol("my string") function and the "my string" value is merely used as an identifier, you can have the same strings for different Symbol unique values for example
  - This helps with creating suitable property names in all kinds of interfaces that won't conflict with any other kinds (even if they have the same name)
  - All sorts of fascinating usage, such as putting the Symbol inside an Array/Object and taking it out while still totally unique (avoiding mix up)
  
  
The Iterator Interface:
  - The object given to a for/of loop is expected to be iterable (polymorphism), its interface has method expected...
  - Which is Symbol.iterator symbol (a symbol value within every obj/arr/fn.prototype)
  - An iterator works by creating a secondary copy of the original obj/arr/fn
  
  let hello = ["15", "20"];
  let helloIterator = hello[Symbol.iterator];
  console.log(helloIterator.next()); //{value: "15", done: false}
  
  for (let letter of helloIterator){
    console.log(letter); //15, 20
  }
  
  Creating an iterator data structure - Matrix (2 dimensional Array)
  
  Getters, setters, and statics

  - Though interfaces mostly hold functional methods, can also hold non-functional methods to show or set values of the object
  
class Temperature {
  constructor(celsius){
    this.celsius = celsius;
  }
  get fahrenheit() { //Getters
    return this.celsius = * 1.8 + 32; //remember how 'this' is the Object's own parameter
  }
  set fahrenheit(value) { //Setter,
//note it's the exact same method as 'get' but demands a 'value' so hence its difference
    this.celsius = (value-32) / 1.8;
  }
  static fromFahrenheit(value){ //Static, unchanging, only stored in the Constructor and
//NOT the actual Instance, useful because we can utilise it as a reliable method everytime
    return new Temperature((value-32)/1.8);
  }
}
let temp = new Temperature(22);
console.log(temp.fahrenheit) //71.6
console.log(temp.celsius); //22 remember that .celsius is only via this.celsius and it
// only holds celsius all around (fahrenheit is instead converted everytime)

temp.fahrenheit = 86; console.log(temp.fahrenheit); //86 console.log(temp.celsius); //30
//this.celsius = (value-32) / 1.8; -> 86-32 = 54, 54/1.8 = 30
  
Inheritance:
  
  
  
  
  }







*/