const morningGates = [
  { id: "North", capacity: 5, queue: [3, 6, 2, 4] },
  { id: "East", capacity: 3, queue: [2, 4, 3, 5] },
  { id: "South", capacity: 4, queue: [1, 2, 3, 1] },
  { id: "West", capacity: 2, queue: [4, 1, 2, 3] },
];

const nightGates = [
  { id: "North", capacity: 4, queue: [6, 2, 5, 1] },
  { id: "East", capacity: 2, queue: [3, 3, 4, 2] },
  { id: "South", capacity: 5, queue: [2, 1, 2, 3] },
  { id: "West", capacity: 3, queue: [5, 2, 1, 4] },
];

function initializeThroughput(gates) {
  const summary = {};
  for (const gate of gates) {
    summary[gate.id] = 0;
  };
  return summary;
}

function processGateFlow(gate, tickIndex) {
  let currentTickQueue = gate.queue[tickIndex];
  let processed = 0;
  while (currentTickQueue > 0 && processed < gate.capacity) {
    currentTickQueue--;
    processed++;
  }
  return {
    processed: processed,
    overflow: currentTickQueue
  };
}

// the attendees who are in excees currentTickQueue holds 
// value that value will pass to func rerouteOverflow.
// currentGate mean where overflow happen.

function rerouteOverflow(gates, currentGate, ){

} ;


// Now that you have functions to process individual ticks and handle overflow, 
  // it’s time to create a controller function for a single gate.
  // This function will handle all the actions for one gate during a single tick of the simulation.


// gates: The full array of gate objects.
// gate: The current gate being processed.
// tickIndex: The current tick index for the simulation.
// throughputSummary: An object tracking total processed attendees per gate.

function handleGateAtTick(gates, gate, tickIndex, throughputSummary) {
  console.log("\nProcessing " + gate.id + "...");
  console.log(
    gate.queue[tickIndex] + " attendees arriving."
  );
  const result = processGateFlow(gate, tickIndex);
  throughputSummary[gate.id] += result.processed;
  if (result.overflow > 0) {
    console.log(
      "Overflow of " + result.overflow +
      " attendees. Rerouting..."
    );
    rerouteOverflow(gates, gate, tickIndex, result.overflow);
  }
};


// It will be helpful to have a function for displaying a summary of throughput during a simulation. 
// Create an empty function named printSummary with a parameter summary.

    function printSummary(summary) {
  console.log("\nThroughput Summary");
  for (const gateId in summary) {
    console.log(
      gateId + ": " + summary[gateId] +
      " attendees processed"
    );
  }
};


 // Now you can build a function for simulating the festival. 
// Create an empty function named simulateFestival with parameters gates and timeBlock.

function simulateFestival(gates, timeBlock) {
  console.log("\n" + timeBlock + " Simulation");
  const throughputSummary = initializeThroughput(gates);
  const maxTicks = gates[0].queue.length;   // This value will be used to control your simulation loop, ensuring each tick is processed for all gates
const tickIndex = 0;    //  To keep track of which tick is currently being processed during the simulation, create a variable named tickIndex and assign it an initial value of 0.
                        //This variable will be used to loop through all ticks in your simulation and ensure each gate is processed in the correct order.
while (tickIndex < maxTicks) {
console.log("\nTick " + (tickIndex + 1));
    for(const gate in gates){
      handleGateAtTick(gates, gate, tickIndex, throughputSummary);
      
    };
    tickIndex++;
  };
   printSummary(throughputSummary);
};

simulateFestival(morningGates, "Morning");
simulateFestival(nightGates, "Night");



// OUTPUT

// Morning Simulation

// Tick 1

// Processing North...
// 3 attendees arriving.

// Processing East...
// 2 attendees arriving.

// Processing South...
// 1 attendees arriving.

// Processing West...
// 4 attendees arriving.
// Overflow of 2 attendees. Rerouting...
// 2 attendees rerouted to North

// Tick 2

// Processing North...
// 6 attendees arriving.
// Overflow of 1 attendees. Rerouting...
// 1 attendees rerouted to East

// Processing East...
// 5 attendees arriving.
// Overflow of 2 attendees. Rerouting...
// 2 attendees rerouted to South

// Processing South...
// 4 attendees arriving.

// Processing West...
// 1 attendees arriving.

// Tick 3

// Processing North...
// 2 attendees arriving.

// Processing East...
// 3 attendees arriving.

// Processing South...
// 3 attendees arriving.

// Processing West...
// 2 attendees arriving.

// Tick 4

// Processing North...
// 4 attendees arriving.

// Processing East...
// 5 attendees arriving.
// Overflow of 2 attendees. Rerouting...
// 2 attendees rerouted to South

// Processing South...
// 3 attendees arriving.

// Processing West...
// 3 attendees arriving.
// Overflow of 1 attendees. Rerouting...
// 1 attendees rerouted to North

// Throughput Summary
// North: 14 attendees processed
// East: 11 attendees processed
// South: 11 attendees processed
// West: 7 attendees processed

// Night Simulation

// Tick 1

// Processing North...
// 6 attendees arriving.
// Overflow of 2 attendees. Rerouting...
// 2 attendees rerouted to East

// Processing East...
// 5 attendees arriving.
// Overflow of 3 attendees. Rerouting...
// 3 attendees rerouted to South

// Processing South...
// 5 attendees arriving.

// Processing West...
// 5 attendees arriving.
// Overflow of 2 attendees. Rerouting...
// 2 attendees rerouted to North

// Tick 2

// Processing North...
// 2 attendees arriving.

// Processing East...
// 3 attendees arriving.
// Overflow of 1 attendees. Rerouting...
// 1 attendees rerouted to South

// Processing South...
// 2 attendees arriving.

// Processing West...
// 2 attendees arriving.

// Tick 3

// Processing North...
// 5 attendees arriving.
// Overflow of 1 attendees. Rerouting...
// 1 attendees rerouted to East

// Processing East...
// 5 attendees arriving.
// Overflow of 3 attendees. Rerouting...
// 3 attendees rerouted to South

// Processing South...
// 5 attendees arriving.

// Processing West...
// 1 attendees arriving.

// Tick 4

// Processing North...
// 1 attendees arriving.

// Processing East...
// 2 attendees arriving.

// Processing South...
// 3 attendees arriving.

// Processing West...
// 4 attendees arriving.
// Overflow of 1 attendees. Rerouting...
// 1 attendees rerouted to North

// Throughput Summary
// North: 11 attendees processed
// East: 8 attendees processed
// South: 15 attendees processed
// West: 9 attendees processed
