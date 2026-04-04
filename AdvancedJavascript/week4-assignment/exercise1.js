import { teas } from "./teas.js";

class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name || typeof name !== "string") {
      throw new Error("Name is required");
    }

    const validTypes = ["green", "black", "herbal", "oolong", "white"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    }

    if (typeof pricePerGram !== "number" || pricePerGram <= 0) {
      throw new Error("Price per gram must be a positive number");
    }

    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }

  priceFor(grams) {
    return Number((this.pricePerGram * grams).toFixed(2));
  }

  describe() {
    const organicText = this.organic ? " [organic]" : "";
    return `${this.name} (${this.type}) from ${this.origin} - ${(
      this.pricePerGram * 100
    ).toFixed(2)} DKK/100g${organicText}`;
  }

  static fromObject(obj) {
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
    );
  }
}

try {
  new Tea("", "green", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
}

try {
  new Tea("Test", "purple", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
}

const teaInstances = teas.map(Tea.fromObject);
console.log(teaInstances.length);
console.log(teaInstances[0].describe());

console.log(teaInstances[1].describe());
