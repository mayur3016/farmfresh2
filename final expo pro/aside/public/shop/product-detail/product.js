const db = firebase.database();
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const detailContainer = document.getElementById('product-detail-content');

db.ref('products/' + productId).once('value')
  .then(snapshot => {
    const product = snapshot.val();

    detailContainer.innerHTML = `
      <div class="product-detail-card">
        <img src="${product.imageUrl}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>₹${product.price}</strong></p>
        <button class="btn" onclick="addToCart('${productId}')">Add to Cart</button>
      </div>
    `;
  });

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  db.ref('products/' + id).once('value').then(snapshot => {
    const product = snapshot.val();
    product.id = id;
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart!");
  });
}
