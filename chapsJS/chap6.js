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
  //another, explicit way of using the function's '.call' method for
  //sending the '.this' parameter - will
  //automatically take the available parameters ^^
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }







*/