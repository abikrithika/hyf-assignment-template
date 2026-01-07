const ulElement = document.getElementById("products");
const products = window.getAvailableProducts();

function renderProducts(products) {
  ulElement.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const liElement = document.createElement("li");

    liElement.innerHTML = `
      <strong>${product.name}</strong><br>
      Price: $${product.price}<br>
    `;

  
    const ratingSpan = document.createElement("span");
    ratingSpan.classList.add("rating");
    ratingSpan.textContent = `Rating: ${product.rating}`;

    if (product.rating >= 8) {
      ratingSpan.classList.add("rating-high");
    } else if (product.rating >= 5) {
      ratingSpan.classList.add("rating-medium");
    } else {
      ratingSpan.classList.add("rating-low");
    }

  
    liElement.appendChild(ratingSpan);
    ulElement.appendChild(liElement);
  }
}

renderProducts(products);
