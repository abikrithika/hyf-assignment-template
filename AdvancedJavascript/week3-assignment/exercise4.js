const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

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

const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 },
  { teaId: 3, grams: 9999 },
];

checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});
