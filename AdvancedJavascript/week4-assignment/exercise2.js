import { teas } from "./teas.js";
import { Tea } from "./exercise1.js";

export class OrderItem {
  constructor(tea, grams) {
    if (!tea || typeof tea.priceFor !== "function") {
      throw new Error("tea must be a Tea instance");
    }

    if (typeof grams !== "number" || grams <= 0) {
      throw new Error("grams must be a positive number");
    }

    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.priceFor(this.grams);
  }

  describe() {
    return `${this.grams}g ${this.tea.name} - ${this.lineTotal().toFixed(2)} DKK`;
  }
}

export class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    if (this.status !== "pending") {
      throw new Error("Cannot add items unless order is pending");
    }

    if (!(orderItem instanceof OrderItem)) {
      throw new Error("Must add an OrderItem");
    }

    this.items.push(orderItem);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.lineTotal(), 0);
  }

  getSummary() {
    const lines = [];

    lines.push(
      `Order (${this.status}) - ${this.items.length} item${
        this.items.length !== 1 ? "s" : ""
      }`,
    );

    this.items.forEach((item) => {
      lines.push(`  ${item.describe()}`);
    });

    lines.push(`Total: ${this.getTotal().toFixed(2)} DKK`);

    return lines.join("\n");
  }
}

const teaInstances = teas.map(Tea.fromObject);

const order = new Order();
order.addItem(new OrderItem(teaInstances[0], 200));
order.addItem(new OrderItem(teaInstances[7], 50));

console.log(order.getSummary());
console.log("Total:", order.getTotal().toFixed(2), "DKK");
