import { teas } from "./teas.js";
import { Tea } from "./exercise1.js";

export class Inventory {
  constructor() {
    this.items = new Map();
  }

  add(tea, stockCount) {
    this.items.set(tea.name, { tea, stockCount });
  }

  sell(teaName, grams) {
    const item = this.items.get(teaName);
    if (!item) {
      throw new Error(`Tea not found: ${teaName}`);
    }
    if (item.stockCount < grams) {
      throw new Error(`Not enough stock for ${teaName}`);
    }
    item.stockCount -= grams;
  }

  restock(teaName, grams) {
    const item = this.items.get(teaName);
    if (!item) {
      throw new Error(`Tea not found: ${teaName}`);
    }
    item.stockCount += grams;
  }

  getStock(teaName) {
    const item = this.items.get(teaName);
    return item ? item.stockCount : 0;
  }

  getLowStock(threshold) {
    return Array.from(this.items.values()).filter(
      (item) => item.stockCount < threshold,
    );
  }

  getTotalValue() {
    return Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.tea.pricePerGram * item.stockCount,
      0,
    );
  }
}

const teaInstances = teas.map(Tea.fromObject);
const inventory = new Inventory();

teaInstances.forEach((tea) => {
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha"));

inventory.sell("Sencha", 50);
console.log("After selling 50g:", inventory.getStock("Sencha"));
console.log("Low stock (< 50):");
inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK",
);
