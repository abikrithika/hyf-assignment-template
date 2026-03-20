import { teas } from "./teas.js";

const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

function validateOrder(order, callback) {
  setTimeout(() => {
    const errors = [];

    order.items.forEach((item) => {
      const teaExists = teas.find((tea) => tea.id === item.teaId);
      if (!teaExists) {
        errors.push(`Tea with id ${item.teaId} not found`);
      }
    });

    callback({
      valid: errors.length === 0,
      errors: errors,
    });
  }, 200);
}

function calculateTotal(order, callback) {
  setTimeout(() => {
    let total = 0;

    order.items.forEach((item) => {
      const tea = teas.find((t) => t.id === item.teaId);
      if (tea) total += tea.pricePerGram * item.grams;
    });

    callback({
      orderId: order.id,
      total: total,
    });
  }, 300);
}

function checkStock(order, callback) {
  setTimeout(() => {
    const shortages = [];

    order.items.forEach((item) => {
      const tea = teas.find((t) => t.id === item.teaId);
      if (tea && tea.stockCount < item.grams) {
        shortages.push(`Not enough stock for tea ${tea.name}`);
      }
    });

    callback({
      orderId: order.id,
      inStock: shortages.length === 0,
      shortages: shortages,
    });
  }, 400);
}

function processOrder(order) {
  console.log("Processing order", order.id);

  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");

    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

      checkStock(order, (stockStatus) => {
        if (!stockStatus.inStock) {
          console.log("Stock check failed:", stockStatus.shortages);
          return;
        }
        console.log("Stock is sufficient. Order processed successfully!");
      });
    });
  });
}

processOrder(order);
