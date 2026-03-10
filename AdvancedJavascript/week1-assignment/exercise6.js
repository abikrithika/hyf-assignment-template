import { teas } from "./teas.js";

const totalValue = teas.reduce(
  (sum, tea) => sum + tea.pricePerGram * tea.stockCount,
  0,
);
console.log("Total inventory value:", totalValue);
