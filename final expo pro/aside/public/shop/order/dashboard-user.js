auth.onAuthStateChanged(async user => {
  if (!user) return alert("Login required");

  const container = document.getElementById("orders-container");

  const snapshot = await db.collection("orders").where("userId", "==", user.uid).get();
  snapshot.forEach(doc => {
    const order = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Order Total: ₹${order.total}</h3>
      <ul>${order.items.map(item => `<li>${item.name} - ₹${item.price}</li>`).join("")}</ul>
      <hr/>
    `;
    container.appendChild(div);
  });
});
