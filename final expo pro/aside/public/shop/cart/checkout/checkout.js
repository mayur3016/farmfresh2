const db = firebase.database();
const auth = firebase.auth();

document.getElementById('checkout-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const user = auth.currentUser;
  if (!user) return alert("Please login");

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) return alert("Your cart is empty.");

  const groupedByFarmer = {};

  cart.forEach(item => {
    if (!groupedByFarmer[item.farmerId]) groupedByFarmer[item.farmerId] = [];
    groupedByFarmer[item.farmerId].push(item);
  });

  for (let farmerId in groupedByFarmer) {
    const order = {
      userId: user.uid,
      farmerId,
      name,
      address,
      phone,
      items: groupedByFarmer[farmerId],
      status: "Pending",
      createdAt: Date.now()
    };

    await db.ref("orders").push(order);
  }

  localStorage.removeItem("cart");
  alert("Order placed successfully!");
  window.location.href = "/aside/public/shop/order/order-confirmation.html";
});
