/*
Chap7 Project: A Robot

Building a program of a robot that performs mail-delivery (picking up
and dropping off parcels) in a virtual world.

The virtual world is the village of Meadowfield consisting of 11
places with 14 roads ('const road' is an array of the 14 roads).
The data structure we're using is a 'graph' which is a collecting
of points (locations) with lines between them (roads).
*/
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
//notice how it's in the format of [locationA-locationB] -> this is a road

//Let's convert the above array of roads into a data structure that for each
//place tells us what can be reached from there.

//given an array of 'edges'

function buildGraph(edges) {
  let graph = Object.create(null);
  
  function addEdge(from, to) {
//literally adding an edge to graph
    if (graph[from] == null){
      graph[from] == [to];
    } else {
      graph[from].push(to);
    }
  }
  
  
  for (let [from, to] of edges.map(r => r.split("-"))) {
//'split' the road strings from "Start-End" to two-element arrays containing
//'Start' and 'End' as separate arrays
    addEdge(from, to);
    addEdge(to, from); //take care of both directions (?)
  }
  return graph;
}
const roadGraph = buildGraph(roads);
console.log(roadGraph);


/*
{
Alice's House:	["Bob's House", "Cabin", "Post Office"]

Bob's House:	["Alice's House", "Town Hall"]

Cabin:	["Alice's House"]

Post Office:	["Alice's House", "Marketplace"]

Town Hall:	[
0:	"Bob's House"
1:	"Daria's House"
2:	"Marketplace"
3:	"Shop"
]
Daria's House:	["Ernie's House", "Town Hall"]

Ernie's House:	["Daria's House", "Grete's House"]
Grete's House:	["Ernie's House", "Farm", "Shop"]
Farm:	["Grete's House", "Marketplace"]
Shop:	[
0:	"Grete's House"
1:	"Marketplace"
2:	"Town Hall"
]
Marketplace:	[
0:	"Farm"
1:	"Post Office"
2:	"Shop"
3:	"Town Hall"
]
*/

/*
Robot will be moving around village, parcels in various places, each addressed
to some other place. Robot picks up (1) and delivers others (2) when arrives
at each location.
Then decide where to go next and make a decision.

Don't need to create a Class and Object for every thing (i.e. robot, parcels,
village etc), need to think in a nuanced manner and focus on purely the necessaties.

What is the village's state after every move? Minimal set of values defined would be:
  - (1) robot's current location
  - (2) the collection of undelivered parcels (= EACH of which has a (1a) current location
        and a (2b) destination address)
That's it (2).
*/
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
    //[{parcels.place, parcels.address},
    //{parcels.place2, parcels.address2}]
  }

  move(destination) {
//first checks whether there's a road going from current place to destination,
//if not then returns to old state since not valid move

    if (!roadGraph[this.place].includes(destination)) { //Does 'not equal'
      return this;
    } else {
/*new set of parcels, (1) that need to be carried so can be moved along from the
current place to the other places (via map) and (2) parcels addressed to current
place need to be delivered (removed, via filter)
*/
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
//if the parcel's current place != robot's current place
//i.e. the current location != current location of parcel
//return parcel because it's going to be filtered anyway (not removed)
        return {place: destination, address: p.address};
//gave the parcel a new 'current location' but obvs same address
//because it's here and needs to be moved to its address,
//hence robot literally moves each location's parcel one by one
      }).filter(p => p.place != p.address);
//removing the ones that current location == address, obvs those are already delivered then
      return new VillageState(destination, parcels);
    }
  }
}

PRINTING/TESTING/DEBUGGING Purposes:
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      console.log(`${JSON.stringify(this.place)} does not `+
					`include ${JSON.stringify(destination)}`);
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) {
      		console.log(`${JSON.stringify(p.place)} does `+
			`not equal ${JSON.stringify(this.place)}`);
          return p;
        } else {
            console.log(`${JSON.stringify(p.place)} equals `+
			`${JSON.stringify(this.place)}`);
            console.log(`Hence return place: ${JSON.stringify(destination)}`
			+` address: ${JSON.stringify(p.address)}`);
        	return {place: destination, address: p.address};
        }
      }).filter(p => p.place != p.address);
      console.log(`New parcels are ${JSON.stringify(parcels)}`);
      return new VillageState(destination, parcels);
    }
  }
}

//console.log(roadGraph);
let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"},
   {place: "Bob's House", address: "Alice's House"},
   {place: "Marketplace", address: "Town Hall"}
  ]
);
let next = first.move("Alice's House");

console.log(`next.place = ${JSON.stringify(next.place)}`);
// → Alice's House
console.log(`next.parcels = ${JSON.stringify(next.parcels)}`);
// → []
//console.log(`first.place = ${JSON.stringify(first.place)}`);
// → Post Office

let next2 = next.move("Bob's House");
console.log(`next2.place = ${JSON.stringify(next2.place)}`);
console.log(`next2.parcels = ${JSON.stringify(next2.parcels)}`);

let next3 = next2.move("Alice's House");
console.log(`next3.place = ${JSON.stringify(next3.place)}`);
console.log(`next3.parcels = ${JSON.stringify(next3.parcels)}`);
/*
let next3 = next2.move("Marketplace");
console.log(`next3.place = ${JSON.stringify(next3.place)}`);
console.log(`next3.parcels = ${JSON.stringify(next3.parcels)}`);
*/

RESULT:
/*

"Post Office" equals "Post Office"
returns {place: "Alice's House", address: "Post Office"
"Bob's House" does not equal "Post Office"
"Marketplace" does not equal "Post Office"
New parcels are [{"place":"Bob's House","address":"Alice's House"},{"place":"Marketplace","address":"Town Hall"}]
next.place = "Alice's House"
next.parcels = [{"place":"Bob's House","address":"Alice's House"},{"place":"Marketplace","address":"Town Hall"}]
"Bob's House" does not equal "Alice's House"
"Marketplace" does not equal "Alice's House"
New parcels are [{"place":"Bob's House","address":"Alice's House"},{"place":"Marketplace","address":"Town Hall"}]
next2.place = "Bob's House"
next2.parcels = [{"place":"Bob's House","address":"Alice's House"},{"place":"Marketplace","address":"Town Hall"}]
"Bob's House" equals "Bob's House"
returns {place: "Alice's House", address: "Bob's House"
"Marketplace" does not equal "Bob's House"
New parcels are [{"place":"Marketplace","address":"Town Hall"}]
next3.place = "Alice's House"
next3.parcels = [{"place":"Marketplace","address":"Town Hall"}]
*/

/*
Persistent Data:

Data structures that don't change are called 'immutable' or 'persistent'. In JS, despite almost everything is able to be changed, there is a function Object.freeze.

Helps with ambitious projects, largely because of complexity. Although it's better to add a comment instead.

Simulation (random):

The basic function of a robot is looking at the world and deciding on the direction to move. Hence we need it to take in the (1) VillageState object (state), the (2) memory so can run/execute plans. Robot will return a direction and memory value that will be given back to it next time it's called.

*/

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
//See, just the state and memory into robot
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

//For a robot to 'solve' a given state, it must pick up all parcels and deliver to all addresses by visiting every location? Let's try random picks

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  //Math.random() return value between 0 and 1, multiplying w/ array.length will give a position
  return array[choice];
}

function randomRobot(state){
  return {direction: randomPick(roadGraph[state.place])};
  //remember the structure of our roadGraph array, it's literally like an array with a single place as an array which then holds multiple other places ('pointing to them')
  //literally makes a direction pick, which road to take
  
  
}

//Since this robot doesn't need to remember anything, ignores second argument and omits 'memory' property in returned object

//let's create a static method
VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    //Object.keys returns given object's property names iterated properly into an array
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
//Confusing: do..while loop, so while a (place == address), do {place = randomPick(Object.keys(roadGraph));
//We don't want parcels where their delivery address is the same as their location address

    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

runRobot(VillageState.random(), randomRobot);

/*
The Mail Truck’s Route:

Inspired from a real life mail delivery technique, find a route that passes all places in the village
*/

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];


//We'll need to make use of robot memory

function routeRobot(state, memory) {
  if (memory.length == 0) { //initial
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
  //the direction chosen will be first one (Alice House) and then deleted via slice, since we're picking this one already
}

//Proven faster: will take a maximum 26 turns (twice the actual route itself (13)

/*
Pathfinding:

Need a better method, a 'route-finding' function, finding a route through a graph is a typical 'search problem'

Number of possible routes through a graph is infinite, but when searching for a route from A to B, only interested in ones starting at A. Also avoiding routes that visit the same place twice, hence we cut down the number of routes that the route finder has to consider further.

Largely interested in the 'shortest route'. Visualised, our algorithm could be 'growing' routes from the starting point, exploring every reachable place that hasn't been visited yet, until a route fits the goal. Hence the robot will only explore the relevant (shortest) routes.

Has to be done in the right order too, first places need to be explored first.

Hence function keeps a 'work list', array of places that should be explored next, along with the route that just got us there, starts with start position and empty route.



*/

function findRoute(graph, from, to) {
  //i.e. findRoute(roadGraph, this.place, parcel.place)
  //(or parcel.address if wanna deliver))
  
  let work = [{at: from, route: []}];
  //work list, array of places that should be explored next, along with the route that got us there
  //starts initial with start pos and empty route
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    //i.e. the 'from' and []
    for (let place of graph[at]) {
      //
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
//.some method returns true IF at least one passes test (at least one w.at == place)
//so if there is NO w.at == place
        work.push({at: place, route: route.concat(place)});
      }
      
    }
  }
}

runRobot/*Animation*/(VillageState.random(),
                  goalOrientedRobot, []);
                  
runRobot(state, robot, memory);

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    //console.log(`let
    for (let place of graph[at]) {
      console.log(graph[at]);
      if (place == to) {
        console.log(`place: ${place} == to: ${to}`+
                    ` return route.concat(place)`);
		return route.concat(place);
      }
      if (!work.some(w => w.at == place)) {
        console.log(`work.at: ${JSON.stringify(work.at)} != place: ${place}`+
                    ` return route.concat(place)`);
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

console.log(findRoute(roadGraph, "Alice's House", "Shop"));



Questions:


function compareRobots(robot1, memory1, robot2, memory2) {
  // Your code here
  function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      return turn;
      break;
    }
    let action = robot(state, memory);
//See, just the state and memory into robot
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}
  //route robo
  let robot1Count = 0, robot2Count = 0, i = 0;
  
  for (i = 0; i < 100; i++) {
    let myVillage = VillageState.random(); //new Object no?
  //  console.log(`myVillage: ${myVillage}`);
	robot1Count = runRobot(myVillage, robot1, memory1) + robot1Count;
	robot2Count = runRobot(myVillage, robot2, memory2) + robot2Count;
  }
  let robot1CountAverage = robot1Count/i;
  console.log(robot1CountAverage);
  let robot2CountAverage = robot2Count/i;
  console.log(`robot1CountAverage: ${robot1CountAverage}`+
              ` and robot2CountAverage: ${robot2CountAverage}`);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
//  let myVillage = VillageState.random(); //new Object no?
//console.log(myVillage);

//console.log(runRobot(myVillage, routeRobot, []));