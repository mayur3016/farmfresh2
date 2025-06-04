// dashboard-farmer.js

document.addEventListener('DOMContentLoaded', () => {
  loadFarmerProducts();
  setupAddProductForm();
  loadOrderStats();
});

// Load farmer's products from localStorage or backend
function loadFarmerProducts() {
  const productContainer = document.getElementById('product-list');
  productContainer.innerHTML = '';

  const products = JSON.parse(localStorage.getItem('farmerProducts')) || [];

  if (products.length === 0) {
    productContainer.innerHTML = '<p>No products added yet.</p>';
    return;
  }

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button onclick="editProduct(${index})">Edit</button>
      <button onclick="deleteProduct(${index})">Delete</button>
    `;
    productContainer.appendChild(card);
  });
}

// Handle adding new product
function setupAddProductForm() {
  const form = document.getElementById('add-product-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const price = parseFloat(form.price.value);
    const stock = parseInt(form.stock.value);

    if (!name || isNaN(price) || isNaN(stock)) {
      alert('Please fill all fields correctly.');
      return;
    }

    const newProduct = { name, price, stock };
    const products = JSON.parse(localStorage.getItem('farmerProducts')) || [];
    products.push(newProduct);
    localStorage.setItem('farmerProducts', JSON.stringify(products));
    form.reset();
    loadFarmerProducts();
  });
}

// Edit a product
function editProduct(index) {
  const products = JSON.parse(localStorage.getItem('farmerProducts')) || [];
  const product = products[index];
  const name = prompt('Product name:', product.name);
  const price = parseFloat(prompt('Price:', product.price));
  const stock = parseInt(prompt('Stock:', product.stock));

  if (!name || isNaN(price) || isNaN(stock)) return;

  products[index] = { name, price, stock };
  localStorage.setItem('farmerProducts', JSON.stringify(products));
  loadFarmerProducts();
}

// Delete a product
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem('farmerProducts')) || [];
  if (!confirm(`Are you sure you want to delete "${products[index].name}"?`)) return;
  products.splice(index, 1);
  localStorage.setItem('farmerProducts', JSON.stringify(products));
  loadFarmerProducts();
}

// Load stats
function loadOrderStats() {
  // Dummy data, replace with real stats
  const stats = {
    totalOrders: 12,
    totalRevenue: 14500,
  };
  document.getElementById('total-orders').textContent = stats.totalOrders;
  document.getElementById('total-revenue').textContent = `₹${stats.totalRevenue}`;
}
