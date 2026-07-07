// this algo run with O(n^2);

function getMaxProfit(prices, budget){
if(prices.length === 0 || !budget) return "get Proper Values";

let maxProfit = 0;

// let buy;
// let sell;

for(let i = 0; i < prices.length; i++){
    let shares =  Math.floor(budget / prices[i]);
    for(let j = i + 1; j < prices.length; j++){
      let sell = Math.floor(prices[j] * shares);
      let profit = shares (prices[j] - prices[i]);
      if(maxProfit < profit){
        maxProfit = profit
      }
    }
}
return maxProfit.toFixed(2);

}


console.log(getMaxProfit([5, 6], 50)); // 10.00
console.log(getMaxProfit([8, 2, 5, 10], 20)); // 80.00
console.log(getMaxProfit([4, 5, 3, 6], 20)); // 18.00
console.log(getMaxProfit([54.40, 51.22, 53.99, 50.28, 53.01, 52.84], 200));  // 8.31


// here is the more optimized approach to the same problem.

// to transform O(n2) to O(n);

function getMaxProfit2(prices, budget){
    if(!prices.length || budget <= 0){
        return "00.00";
    }

    let maxProfit2 = 0;

    let maxSellPrice = prices[prices.length - 1];

    for(let i = prices.length - 2; i >= 0; i--){
        const buyPrice = prices[i];
        const shares = Math.floor(budget / buyPrice);
        const profit = shares * (maxSellPrice - buyPrice);
        if(profit > maxProfit2){
            maxProfit2 = profit;
        }

        if(buyPrice > maxSellPrice){
            maxSellPrice = buyPrice;
        }
    }

    return maxProfit2.toFixed(2);
}