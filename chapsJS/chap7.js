//Chap7 Project: A Robot
/*
Building a program of a robot that performs mal-delivery (picking up
and dropping off parcels) in a virtual world.

The virtual world is the village of Meadowfield consisting of 11
places with 14 roads ('const road' is an array of the 14 roads).
The data structure we're using is a 'graph' which is a collecting
of points (locations) with lines between them (roads).

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

Let's convert the above array of roads into a data structure that for each place tells us what can be reached from there.

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
//'split' the road strings from "Start-End" to two-element arrays containing 'Start' and 'End' as separate arrays
    addEdge(from, to);
    addEdge(to, from); //take care of both directions (?)
  }
  return graph;
}

Robot will be moving around village, parcels in various places, each addressed to some other place. Robot picks up (1) and delivers others (2) when arrives at each location.

Then decide where to go next and make a decision.

Don't need to create a Class and Object for every thing (i.e. robot, parcels, village etc), need to think in a nuanced manner and focus on purely the necessaties.

What is the village's state after every move? Minimal set of values defined would be:
  - (1) robot's current location
  - (2) the collection of undelivered parcels (= each of which has a current location and a destination address)
That's it (2).

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels; //wotjom
  }

  move(destination) {
//first checks whether there's a road going from current place to destination, if not then returns to old state since not valid move

    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place)
      })
    }
  }