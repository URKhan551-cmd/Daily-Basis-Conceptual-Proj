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
