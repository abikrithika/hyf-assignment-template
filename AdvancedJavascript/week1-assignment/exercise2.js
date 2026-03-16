import { teas } from "./teas.js";

function inventoryReport(teas) {
  const totalTeas = teas.length;
  const inStock = teas.filter((tea) => tea.inStock).length;
  const outOfStock = teas.filter((tea) => !tea.inStock).length;
  let totalInventoryValue = 0;
  let totalPrice = 0;

  teas.forEach((tea) => {
    totalInventoryValue += tea.pricePerGram * tea.stockCount;
    totalPrice += tea.pricePerGram;
  });
  const averagePrice = totalPrice / totalTeas;
  return {
    totalTeas,
    inStock,
    outOfStock,
    totalInventoryValue,
    averagePrice,
  };
}
console.log(inventoryReport(teas));
