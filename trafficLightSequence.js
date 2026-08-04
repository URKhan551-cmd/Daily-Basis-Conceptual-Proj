const config1 = {
  fault: false,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 4 }
  ]
};

const config2 = {
  fault: false,
  phases: [
    { color: "red", duration: 3 },
    { color: "yellow", duration: -2 },
    { color: "green", duration: 6 }
  ]
};

const config3 = {
  fault: true,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 6 }
  ]
};

const config4 = {
  fault: false,
  phases: []
};

function runSequence(config, cycles){
  let [...phases] = config.phases;
  let fault = config.fault;
  if(phases.length === 0){
    console.log("No phases found");
    return;
  };
  if(fault === true){
     console.log("Faulted phase!");
     return;
  }
for(let i =0; i<cycles; i++){
  for(let j=0; j<phases.length; j++){
     if(phases[j].duration <= 0){
      console.log("Invalid phase");
    
     }else {
      console.log(`Switching to ${phases[j].color} for ${phases[j].duration} s`);
    
     }
     
  }
}


};
// runSequence(config1, 1);
// runSequence(config1, 2);

function generateTimeline(config, cycles){
  let resultArr = [];

   let totalTime = 0;
  

  for(let i=0; i<cycles; i++){
    
    for(let j=0; j<config.phases.length; j++){
       totalTime += config.phases[j].duration;
      resultArr.push(totalTime);
    };
    
  };
  return resultArr;

};
console.log(generateTimeline(config1,1));
// runSequence(config1, 2);
 runSequence(config2, 1);
runSequence(config3, 2);
runSequence(config4, 5);
console.log(generateTimeline(config1, 1));
console.log(generateTimeline(config2, 2));
console.log(generateTimeline(config3, 1));
console.log(generateTimeline(config4, 1));



//////////////////////////
function generateTimeline(config,cycles){
  const allPhases = Array(cycles).fill(config.phases).flat();  //  Array(let say cycle =2)  this will create 2 array inside of an arr
  let total = 0;                                                // .fill(here the three object of each arr put inside)
  return allPhases.reduce((timeline,phase)=>{                   // .flat(spread the values of that object properties)
    total+=phase.duration;                     // here the timeline is act an accumulator. phases has been in loop 
    timeline.push(total);                      // get phases.duration and put into total then total into accumulator.
    return timeline;                        // finnaly rretrunn  accumuatr so called timeline.
  },[]);
}
