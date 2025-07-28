const menuItems = [
  {
    name: "Jollof Rice",
    price: 1500,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Jollof_Rice_with_Chicken.jpg",
    desc: "Tasty Nigerian Jollof with chicken"
  },
  {
    name: "Egusi Soup & Akpu",
    price: 2000,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Egusi_soup_with_pounded_yam.jpg",
    desc: "Rich egusi soup served with soft akpu"
  },
  {
    name: "Suya",
    price: 1000,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Nigerian_suya.jpg",
    desc: "Spicy grilled beef skewers"
  },
  {
    name: "Moi Moi",
    price: 700,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Moi_Moi_Nigerian_Delicacy.jpg",
    desc: "Steamed bean pudding"
  },
  {
    name: "Fried Plantain",
    price: 600,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Fried_plantain.jpg",
    desc: "Crispy sweet fried plantains"
  },
  {
    name: "Ofada Rice & Sauce",
    price: 1800,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Ofada_rice.jpg",
    desc: "Local ofada rice with spicy sauce"
  }
];

let cart = [];

const foodList = document.getElementById('food-list');
const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
const submitBtn = document.getElementById('submitBtn');
const printBtn = document.getElementById('printBtn');

// Render menu
menuItems.forEach((item, index) => {
  const card = document.createElement('div');
  card.className = 'food-card';
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.desc}</p>
    <p><strong>₦${item.price}</strong></p>
    <button data-index="${index}">Add to Plate</button>
  `;
  foodList.appendChild(card);
});

// Add to cart handler
foodList.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.getAttribute('data-index');
    addToCart(menuItems[index]);
  }
});

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  cart.forEach((item, idx) => {
    const div = document.createElement('div');
    div.textContent = `${item.name} - ₦${item.price}`;
    cartItems.appendChild(div);
  });

  totalDisplay.textContent = calculateTotal();
}

function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

// Submit order
submitBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Please add at least one item to your plate!");
    return;
  }

  // Simulate loading
  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("🎉 Order Submitted Successfully!");
    cart = [];
    updateCart();
    submitBtn.textContent = "Submit Order";
    submitBtn.disabled = false;
  }, 1000);
});

// Print button
printBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Nothing to print. Add some meals first.");
    return;
  }

  let printWindow = window.open('', '', 'height=600,width=400');
  printWindow.document.write('<html><head><title>Order Summary</title></head><body>');
  printWindow.document.write('<h2>Your Plate</h2><ul>');

  cart.forEach(item => {
    printWindow.document.write(`<li>${item.name} - ₦${item.price}</li>`);
  });

  printWindow.document.write('</ul>');
  printWindow.document.write(`<p><strong>Total: ₦${calculateTotal()}</strong></p>`);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
});
