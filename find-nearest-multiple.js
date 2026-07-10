// its all about how to increase the multiple of multiple to reach near to num or equal

function roundToNearestMultiple(num, multiple) {
    if(!num)return "no num";
    if(num === multiple) return 1;
    console.log(num, multiple);
   
  let product = Math.floor(num / multiple) * multiple;
   let product2 = Math.ceil(num / multiple) * multiple;
   console.log("product first :",product)
   console.log("product 2 which is max :", product2)

if(num  - product <= product2 - num){
  return product;
} else {
  return product2
}
}

console.log(roundToNearestMultiple(5, 3));
console.log(roundToNearestMultiple(17, 4));
console.log(roundToNearestMultiple(43, 5));
console.log(roundToNearestMultiple(38, 11));
console.log(roundToNearestMultiple(93, 12))