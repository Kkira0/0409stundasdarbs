import './bootstrap';
const apiUrl = 'http://localhost:8000/api/products';

const productForm = document.getElementById('productForm');
const productsTable = document.getElementById('productsTable');
const resetBtn = document.getElementById('resetBtn');

let editingProductId = null;

// Fetch all products and render table
async function fetchProducts() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const products = data.data || data; // handle pagination vs plain array
  productsTable.innerHTML = '';

  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.description || ''}</td>
      <td>${p.price}</td>
      <td>${p.status}</td>
      <td>
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    `;
    productsTable.appendChild(tr);
  });
}

// Create or update product
productForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const status = document.getElementById('status').value;

  const payload = { name, description, price, status };

  if (editingProductId) {
    // Update
    await fetch(`${apiUrl}/${editingProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } else {
    // Create
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  resetForm();
  fetchProducts();
});

// Delete product
async function deleteProduct(id) {
  if (!confirm('Are you sure?')) return;
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchProducts();
}

// Edit product
async function editProduct(id) {
  const res = await fetch(`${apiUrl}/${id}`);
  const p = await res.json();
  editingProductId = p.id;
  document.getElementById('name').value = p.name;
  document.getElementById('description').value = p.description;
  document.getElementById('price').value = p.price;
  document.getElementById('status').value = p.status;
}

// Reset form
function resetForm() {
  editingProductId = null;
  productForm.reset();
}

resetBtn.addEventListener('click', resetForm);

// Initial fetch
fetchProducts();
