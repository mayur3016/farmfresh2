document.getElementById('addProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const description = document.getElementById('productDescription').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const stock = parseInt(document.getElementById('productStock').value);
  const file = document.getElementById('productImage').files[0];

  if (!file) return alert("Please select a product image.");

  const user = firebase.auth().currentUser;
  if (!user) {
    alert("You must be logged in to add products.");
    return;
  }

  try {
    const storageRef = firebase.storage().ref(`products/${user.uid}/${file.name}`);
    await storageRef.put(file);
    const imageUrl = await storageRef.getDownloadURL();

    const product = {
      name,
      description,
      price,
      stock,
      image: imageUrl,
      farmerId: user.uid
    };

    await firebase.firestore().collection('products').add(product);
    alert("Product added successfully!");
    document.getElementById('addProductForm').reset();
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Failed to add product: " + error.message);
  }
});

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "/login/login.html";
  });
}
