import { teas } from "./teas.js";

function lowStockAlert(teas) {
  const teaNameAndStockCount = teas.map((tea) => ({
    name: tea.name,
    stockCount: tea.stockCount,
  }));
  return teaNameAndStockCount.sort((a, b) => a.stockCount - b.stockCount);
}

console.log(lowStockAlert(teas));
