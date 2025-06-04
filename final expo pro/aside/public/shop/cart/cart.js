const cartItemsContainer = document.getElementById('cart-items');
const cartTotalContainer = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

const cart = JSON.parse(localStorage.getItem('cart')) || [];

if (cart.length === 0) {
  cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
} else {
  let total = 0;

  cartItemsContainer.innerHTML = cart.map((item, i) => {
    total += item.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price} × ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart(${i})" class="btn">Remove</button>
      </div>
    `;
  }).join('');

  cartTotalContainer.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
  checkoutBtn.style.display = 'inline-block';
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
}
