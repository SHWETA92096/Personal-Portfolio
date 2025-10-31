//Login
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginOverlay = document.getElementById("loginOverlay");
  const siteContent = document.getElementById("siteContent");

  const showSignupLink = document.getElementById("showSignup");
  const showLoginLink = document.getElementById("showLogin");

  // Toggle forms
  showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // Dummy users list
  const users = [
    { email: "admin@example.com", password: "admin123" }
  ];

  // Handle login
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      loginOverlay.style.display = "none";
      siteContent.style.display = "block";
    } else {
      alert("Invalid email or password.");
    }
  });

  // Handle signup
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(!/^\d{6}$/.test(password)){
      alert("Password must be exactly 6 numbers.");
      retrun
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
      alert("Email is already registered.");
      return;
    }

    users.push({ email, password });
    alert("Registration successful! You can now log in.");
    signupForm.reset();
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });
});
//product
// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("khakhraCart")) || [];

// Function to add items to cart
function addToCart(productName, price) {
  const item = { name: productName, price: price, quantity: 1 };

  // Check if item already in cart
  const existingItem = cart.find(p => p.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }

  // Save cart to localStorage
  localStorage.setItem("khakhraCart", JSON.stringify(cart));

  alert(`${productName} added to cart!`);
}

// Function to display cart items (for cart.html)
function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("khakhraCart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  cartContainer.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.innerText = "₹0";
    return;
  }

  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <strong>${item.name}</strong><br>
      ₹${item.price} x ${item.quantity} = ₹${itemTotal}
      <hr>
    `;
    cartContainer.appendChild(div);
  });

  totalElement.innerText = `₹${total}`;
}

// Function to clear cart (optional for checkout)
function clearCart() {
  localStorage.removeItem("khakhraCart");
  displayCartItems();
  alert("Cart has been cleared!");
}

