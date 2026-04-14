import { teas } from "./teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";
import { Customer } from "./exercise4.js";

class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    super(name, type, origin, pricePerGram, organic);

    if (!["A", "B", "C"].includes(grade)) {
      throw new Error("Invalid grade. Must be 'A', 'B', or 'C'.");
    }

    this.grade = grade;
  }

  priceFor(grams) {
    const basePrice = super.priceFor(grams);

    let multiplier = 1;

    if (this.grade === "A") {
      multiplier = 1.5;
    } else if (this.grade === "B") {
      multiplier = 1.25;
    } else if (this.grade === "C") {
      multiplier = 1.1;
    }

    return basePrice * multiplier;
  }

  describe() {
    const gradeText = ` [Grade ${this.grade}]`;
    const organicText = this.organic ? " [organic]" : "";

    return `${this.name}${gradeText} (${this.type}) from ${this.origin} - ${this.priceFor(100).toFixed(2)} DKK/100g${organicText}`;
  }

  static fromTea(tea, grade) {
    return new PremiumTea(
      tea.name,
      tea.type,
      tea.origin,
      tea.pricePerGram,
      tea.organic,
      grade,
    );
  }
}

class ExpressOrder extends Order {
  constructor(expressFee = 25) {
    super();
    this.expressFee = expressFee;
  }

  getTotal() {
    return super.getTotal() + this.expressFee;
  }

  getSummary() {
    const lines = [];

    lines.push(
      `Express Order (${this.status}) - ${this.items.length} item${
        this.items.length !== 1 ? "s" : ""
      }`,
    );

    this.items.forEach((item) => {
      lines.push(`  - ${item.tea.name}: ${item.grams}g`);
    });

    lines.push(`  Express Fee: ${this.expressFee.toFixed(2)} DKK`);
    lines.push(`  Total: ${this.getTotal().toFixed(2)} DKK`);

    return lines.join("\n");
  }
}



const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");
console.log(gyokuro.describe());

console.log(gyokuro.priceFor(100));

const upgraded = PremiumTea.fromTea(teas.map(Tea.fromObject)[0], "B");

console.log(upgraded.describe());

const express = new ExpressOrder(25);
express.addItem(new OrderItem(gyokuro, 100));

console.log(express.getSummary());
console.log(express.getTotal());
