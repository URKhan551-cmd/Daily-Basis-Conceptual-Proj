const poll = new Map();

function addOption(option){

  if(!option){
    return "Option cannot be empty."
  }
// check poll has option or not;
  if(!poll.has(option)){
       poll.set(option, new Set());
       return `Option "${option}" added to the poll.`;
  } 
  return `Option "${option}" already exists.`
}

function vote(option, voterId){
  if(!poll.has(option)){
    return `Option "${option}" does not exist.`
  };
  const voters = poll.get(option);
  if(voters.has(voterId)){
    return `Voter ${voterId} has already voted for "${option}".`
  }
  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`
}

function displayResults(){
  let results = "Poll Results:\n";
  const entries = [...poll.entries()];
  entries.forEach(([option, voterSet], index) => {
    results += `${option}: ${voterSet.size} votes`;
    if(index < entries.length - 1){
      results += "\n";
    }
  });
  // poll.forEach((voterSet, option) => {
  //   results += `${option}: ${voterSet.size} votes\n`;

  // });
  return results;
};
console.log(addOption("Turkey"));


console.log(addOption("Morocco"));
console.log(addOption("Spain"));
console.log(addOption("Algeria"));
 console.log(addOption("Malaysia"));

console.log(vote("Turkey", "traveler1"));
console.log(vote("Turkey", "traveler2"));
console.log(vote("Morocco", "traveler3"));
console.log(vote("Malaysia", "traveler1"));
console.log(vote("Algeria", "traveler1"));



console.log(displayResults())