document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
  const username = document.getElementById("username").value; // Get the username
  // Perform validation of username and password (you can add this logic later)
  // For demonstration purposes, let's assume the login is successful
  // You can replace this with your actual login logic
  const isLoggedIn = true; // Change this based on your actual login logic
  if (isLoggedIn) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        document.getElementById("bill-section").style.display = "block";
    } else {
        // Display an error message if login fails
  alert("Invalid username or password. Please try again.");
    }
  });
  

let Items = [];

function addToCart(name, price) {
    const index = Items.findIndex(item => item.name === name);
    if (index !== -1) {
        Items[index].quantity += 1;
    } else {
        const item = {
            name: name,
            price: price,
            quantity: 1
        };
        Items.push(item);
    }
    updateCartDisplay();
}

function deleteFromCart(index) {
    Items.splice(index, 1);
    updateCartDisplay();
}

function updateQuantity(index, quantity) {
    Items[index].quantity = quantity;
    updateCartDisplay();
}

function checkout(
) {
  let totalPrice = 0;
  const billItemsElement = document.getElementById("bill-items");
  billItemsElement.innerHTML = ''; // Clear previous bill items
// Add customer name
  const customerNameElement = document.createElement('h4');
  const usernameValue = document.getElementById('username').value;
  customerNameElement.textContent = `Customer Name: ${usernameValue}`;
  customerNameElement.style.fontSize = '24px'; // Increase font size
  customerNameElement.style.listStyle = 'none';

billItemsElement.appendChild(customerNameElement);

  // Add bill items
Items.forEach(item => {
      totalPrice += item.price * item.quantity;
      const li = document.createElement('li');
      li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      billItemsElement.appendChild(li);
  });

  document.getElementById("total-price").textContent = `$${totalPrice.toFixed(2)}`;
  
  // Open a new window and display the bill section
let newWindow = window.open('', 'Bill Details', 'width=800,height=600');
  const billSection = document.getElementById("bill-section").outerHTML;
  newWindow.document.write(billSection);
}


function updateCartDisplay(
) {
    const cartElement = document.getElementById('cart-items');
    cartElement.innerHTML = '';
    Items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x
            <div class="quantity">
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${index}, this.value)">
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
            </span>
            <button onclick="deleteFromCart(${index})">Delete</button>
        `;
        cartElement.appendChild(li);
    });
}


document.getElementById("buy-button").addEventListener("click", function() {
  checkout();
});