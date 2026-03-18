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

validateOrder(order, (result) => {
  console.log("Validation result:", result);
});
