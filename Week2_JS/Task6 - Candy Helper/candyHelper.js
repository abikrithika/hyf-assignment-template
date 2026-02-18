//Candy helper
const boughtCandyPrices = [];

function addCandy(candyType, weight) {
  let candyPricePerGram;
  if (candyType === "Sweet") {
    candyPricePerGram = 0.5;
  } else if (candyType === "Chocolate") {
    candyPricePerGram = 0.7;
  } else if (candyType === "Toffee") {
    candyPricePerGram = 1.1;
  } else if (candyType === "Chewing-gum") {
    candyPricePerGram = 0.03;
  }
  const price = weight * candyPricePerGram;

  boughtCandyPrices.push(price);
}
addCandy("Sweet", 20);
addCandy("Chocolate", 1);
addCandy("Toffee", 4);

console.log(boughtCandyPrices);

const amountToSpend = Math.random() * 100;
function canBuyMoreCandy() {
  let totalPrice = 0;
  for (let i = 0; i < boughtCandyPrices.length; i++) {
    totalPrice += boughtCandyPrices[i];
  }
  console.log("Total price so far:", totalPrice);

  if (totalPrice < amountToSpend) {
    return true;
  } else {
    return false;
  }
}

if (canBuyMoreCandy()) {
  console.log("You can buy more, so please do!");
} else {
  console.log("Enough candy for you!");
}
