// Given a number of milliseconds since the last post on an issue, 
// and the last message posted on the issue, determine 
// what you should do with the issue according to these rules:

// If the last message is less than 7 days ago, return "leave it"
// If the last message is 7 or more days ago 
// and its content contains "bump" (case-insensitive), return "close it"
// Otherwise, return "bump it"

function milliSeconds(ms, message){
    const seconds = ms / 1000;
    const min = seconds / 60;
    const hours = min / 60;
    const day = hours / 24;

    if (day < 7){
       return "leave it";
     };
     
    if(message.toLowerCase().includes("bump")) {
      return "close it";
      
     } else {
      return "bump it";
     }
}

console.log(milliSeconds(86400000, "Lets fix it"))
console.log(milliSeconds(1209600000, "still waiting"))
console.log(milliSeconds(864000000, "bump"))
console.log(milliSeconds(604800000, "Do we still want this?"))
console.log(milliSeconds(604800000, "Bumping this"))