import { teas } from "./teas.js";

function stockByCaffeine(teas) {
  return teas.reduce((acc, tea) => {
    acc[tea.caffeineLevel] = (acc[tea.caffeineLevel] || 0) + tea.stockCount;
    return acc;
  }, {});
}

console.log(stockByCaffeine(teas));
