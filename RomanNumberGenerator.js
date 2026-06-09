function convertToRoman(num: number): string {
  let result: string = "";

  const romanArr: [String, number][] = [
    ["M",	1000],
    ["CM",	900],
    ["D",	500],
    ["CD",	400],
    ["C",	100],
    ["XC",	90],
    ["L",	50],
    ["XL",	40],
    ["X",	10],
    ["IX",	9],
    ["V",	5],
    ["IV",	4],
    ["I",	1],
  ]

  for(let [roman, value] of romanArr){
    while(num >= value){
      result += roman;
      num -= value
    }
  }
 return result;
}


console.log(convertToRoman(36));
console.log(convertToRoman(2));