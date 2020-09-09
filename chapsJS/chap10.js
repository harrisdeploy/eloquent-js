//chap10js MODULES

/*
Programs need to have a crystal clear structure, otherwise 'big ball of mud' where it's entangled everywhere and there's difficulty in the holistic understanding it requires for understanding. Secondly, harder to use specific functions separately, need to rewrite it. 'Technical Debt'? Long term benefits, hard to see short term.

Modules:
  - Pieces of program that specifies which other pieces it relies on, what functionality it provides for other modules to use (i.e. its interface, similar to object interfaces)
  - Relations between modules are called 'dependencies', as each has its own 'private scope' -> LEGO
  - Don't worry too much about designing a fitting module structure for a program, only when it starts to get big, take a step back and 'refactor' it
  
Packages:
  - Packages are a means of distributing one or more modules, comes with documentation, able to copied/updated with ease
  - Infrastructure for storing/installing them - NPM
  - Software is cheap to copy rather than creating from scratch, you could probably find any odd function you need (i.e. parseINI -> 'ini')
  - By default, you own the copyright to code you write, but can write open source licences - be aware of this
  
Improvised Modules:
  -



*/