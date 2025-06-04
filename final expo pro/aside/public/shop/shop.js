const db = firebase.database();
const shopContainer = document.getElementById("product-list");

db.ref("products").on("value", (snapshot) => {
  shopContainer.innerHTML = ""; // Clear existing content
  if (!snapshot.exists()) {
    shopContainer.innerHTML = "<p>No products available right now.</p>";
    return;
  }

  snapshot.forEach((childSnapshot) => {
    const product = childSnapshot.val();
    const productId = childSnapshot.key;

    const productHTML = `
      <div class="product-card">
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>₹${product.price}</strong></p>
        <a href="/aside/public/shop/product-detail/product-detail.html?id=${productId}" class="btn">View Details</a>
      </div>
    `;

    shopContainer.innerHTML += productHTML;
  });
});
