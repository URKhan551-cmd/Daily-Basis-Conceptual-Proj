// here is the function which will remove a word with a capital character a single capital char found in a word
// remove it.

// here i give many consoles that you can easily understand the way to solve question step by step.


function getLowercaseWords(str) {
    if(!str) return "";

    const words = str.split(" ");

    console.log(words);

 let result = [];

    for(let char of words){
       console.log(char[0]);
       if(char === char.toLowerCase()){
         result.push(char);
         console.log(result);
       }
    }
  return result.join(" ");
};

console.log(getLowercaseWords("hello Good world"));
getLowercaseWords("these are all lowercase") // "these are all lowercase"
getLowercaseWords("less is NoT more") // should return "less is more"
getLowercaseWords("DonT eat pizza every OTHER day") // should return "eat pizza every day"
getLowercaseWords("the Super quick AND snEaky brown fox Leapt anD jumped over aNd AROUND the lazy SloW dog") // return "the quick brown fox jumped over the lazy dog"

// [ 'hello', 'Good', 'world' ]
// h
// [ 'hello' ]
// G
// w
// [ 'hello', 'world' ]
// hello world
// [ 'hello', 'GOOD', 'world' ]
// h
// [ 'hello' ]
// G
// w
// [ 'hello', 'world' ]