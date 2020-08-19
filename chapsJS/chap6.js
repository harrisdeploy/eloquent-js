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
  - A Class defines the shape of a TYPE of object (methods/properties it has) which is an 'Instance'
    of the Class
  - Hence Prototypes are the Javascript means we use to create Classes, creating instances of the
    same Class which share the same methods (hence same values)
  - But need to make sure you're creating it in the right fashion, has the right properties that
    instances of this Class are supposed to have, leading to Constructor functions...
    
    
Constructors:

  let protoHarris = {
    speak(line){
      console.log(`Hi, I am ${this.type} Harris, says '${line}'`);
    }
  }

  function makeHarris(type) {
    let harris = Object.create(protoHarris);
    harris.type = type;
    return harris;
  }
  
  let coolHarris = makeHarris("cool");
  
  - Javascript has its own method, less cumbersome as the above ^:
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }







*/