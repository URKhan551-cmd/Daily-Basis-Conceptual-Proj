function luckyNumber(name){
  if(!name)return 13;

  const [firstName, LastName] = name.toLowerCase().trim().split(/\s+/));

  const first = countLetter(firstName);
  const last = countLetter(lastName);
  const smaller = Math.min(first.vowel, last.vowel) * Math.min(first.consonent, last.consonent) * Math,min(first.length, last.length);
  const larger = Math.max(first.vowel, last.vowel) * Math.max(first.consonent, last.consonent) * Math.max(first.length, last.length);

  const luckyNumber = larger - smaller;

  return luckyNumber === 0 ? 13 : luckyNumber;
}

function countLetter(word){
    let vowels = new Set(["a", "e", "i", "o", "u"]);

    let foundVowel = 0;
    let foundConsonent = 0;

    for(let char of word){
        if(vowels.has(char)){
            foundVowel++;

        } else{ 
             foundConsonent++
            }
    }

    return {
        vowel: foundVowel,
        consonent: foundConsonent,
        length: word.length;
    }
}
console.log("umair rehman");
