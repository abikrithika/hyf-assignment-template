const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function validateItemsExist(items) {
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();

  items.forEach((item) => {
    const matchTeaId = teas.find((tea) => tea.id === item.teaId);
    if (!matchTeaId) {
      throw new Error(`Tea with ID ${item.teaId} does not exist`);
    }
  });
}
async function checkOrderStock(items) {
  const [teaResponse, inventoryResponse] = await Promise.all([
    fetch(`${API_BASE}/teas`),
    fetch(`${API_BASE}/inventory`),
  ]);

  const teas = await teaResponse.json();
  const inventory = await inventoryResponse.json();

  const shortages = [];

  items.forEach((item) => {
    const matchInventoryId = inventory.find((inv) => inv.teaId === item.teaId);
    const matchTeaId = teas.find((tea) => tea.id === item.teaId);
    let available;
    if (!matchInventoryId) {
      available = 0;
    } else {
      available = matchInventoryId.stockCount;
    }
    if (item.grams > available) {
      let teaName;
      if (matchTeaId) {
        teaName = matchTeaId.name;
      } else {
        teaName = `Tea ID: ${item.teaId}`;
      }
      const shortageItem = {
        name: teaName,
        needed: item.grams,
        available: available,
      };
      shortages.push(shortageItem);
    }
  });
  return {
    inStock: shortages.length === 0,
    shortages: shortages,
  };
}
async function calculateOrderTotal(items) {
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();
  let total = 0;
  items.forEach((item) => {
    const matchTea = teas.find((t) => t.id === item.teaId);
    if (!matchTea) {
      throw new Error("Teas not matched");
    } else {
      total += matchTea.pricePerGram * item.grams;
    }
  });
  return total;
}
async function processOrder(items) {
  console.log("Processing order...\n");

  console.log("1. Validating items...");
  await validateItemsExist(items);

  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    console.log("Shortages found:");
    stockResult.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
    throw new Error("Items out of stock");
  }

  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items);

  console.log("4. Creating summary...\n");

  return {
    items: items.length,
    total,
    status: "ready",
  };
}

const myOrder = [
  { teaId: 1, grams: 50 },
  { teaId: 5, grams: 100 },
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });
