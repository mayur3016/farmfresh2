const db = firebase.database();
const auth = firebase.auth();
const container = document.getElementById("farmer-orders");

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  db.ref("orders").once("value").then(snapshot => {
    container.innerHTML = "";
    snapshot.forEach(child => {
      const order = child.val();

      if (order.farmerId === user.uid) {
        const orderHTML = `
          <div class="order-card">
            <h3>Order ID: ${child.key}</h3>
            <p><strong>Customer:</strong> ${order.name}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <ul>
              ${order.items.map(item => `
                <li>${item.name} - ₹${item.price} × ${item.quantity || 1}</li>
              `).join("")}
            </ul>
          </div>
        `;
        container.innerHTML += orderHTML;
      }
    });

    if (!container.innerHTML) {
      container.innerHTML = "<p>No orders found.</p>";
    }
  });
});
