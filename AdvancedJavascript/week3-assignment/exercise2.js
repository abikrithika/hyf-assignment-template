const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function getTeaDetails(id) {
  const [teaResponse, inventoryResponse] = await Promise.all([
    fetch(`${API_BASE}/teas/${id}`).then((response) => {
      return response.json();
    }),
    fetch(`${API_BASE}/inventory/${id}`).then((response) => {
      return response.json();
    }),
  ]);
  return { ...teaResponse, stock: inventoryResponse.stockCount };
}

getTeaDetails(2).then((tea) => {
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stock} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
});
