auth.onAuthStateChanged(async (user) => {
  if (!user) {
    alert("Please login");
    window.location.href = "/login.html";
    return;
  }

  const container = document.getElementById("farmer-products");
  const snapshot = await db.collection("products").where("farmerId", "==", user.uid).get();

  snapshot.forEach(doc => {
    const data = doc.data();
    const item = document.createElement("div");
    item.innerHTML = `
      <h3>${data.name}</h3>
      <p>₹${data.price}</p>
      <p>Stock: ${data.stock}</p>
      <img src="${data.image}" width="100" />
      <hr/>
    `;
    container.appendChild(item);
  });
});
