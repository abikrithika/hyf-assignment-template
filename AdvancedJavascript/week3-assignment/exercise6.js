const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function signup(email, password) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Signup failed");
  return response.json();
}

async function getAuthToken() {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "testuser@example.com",
      password: "testuser123",
    }),
  });

  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  return data.token;
}

async function checkOrderStock(items) {
  const [teasRes, invRes] = await Promise.all([
    fetch(`${API_BASE}/teas`),
    fetch(`${API_BASE}/inventory`),
  ]);

  const teas = await teasRes.json();
  const inventory = await invRes.json();

  const shortages = [];

  items.forEach((item) => {
    const tea = teas.find((t) => t.id === item.teaId);
    const stock =
      inventory.find((i) => i.teaId === item.teaId)?.stockCount || 0;

    if (item.grams > stock) {
      shortages.push({
        name: tea ? tea.name : `Tea ID: ${item.teaId}`,
        needed: item.grams,
        available: stock,
      });
    }
  });

  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

async function createOrder(items) {
  const stock = await checkOrderStock(items);
  if (!stock.inStock) {
    console.log("Cannot create order — out of stock:");
    stock.shortages.forEach((s) =>
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`),
    );
    return null;
  }

  const token = await getAuthToken();
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Server error:", errorText);
    throw new Error("Failed to create order");
  }

  return response.json();
}

async function getMyOrders() {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
}

signup("testuser@example.com", "testuser123")
  .catch(() => {})
  .then(() => createOrder([{ teaId: 4, grams: 1 }]))
  .then((order) => {
    if (order) console.log("Created order:", order.id);
  })
  .then(() => getMyOrders())
  .then((orders) => console.log("All orders count:", orders.length))
  .catch((err) => console.error("Error:", err.message));
