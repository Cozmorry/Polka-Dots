// Function to show and hide the loading spinner
function toggleSpinner(buttonId, spinnerId, show) {
  const button = document.getElementById(buttonId);
  const spinner = document.getElementById(spinnerId);

  if (show) {
    button.disabled = true;  // Disable the button to prevent multiple submissions
    spinner.style.display = 'inline-block';  // Show the spinner
  } else {
    button.disabled = false;  // Re-enable the button
    spinner.style.display = 'none';  // Hide the spinner
  }
}

// Login Form Submission (existing code)
$('#loginForm').on('submit', async function(event) {
  event.preventDefault();  // Prevent form from submitting the default way

  const username = $('#username').val();
  const password = $('#password').val();

  if (!username || !password) {
    $('#loginError').text('Please enter both username and password').show();
    return;
  }

  // Show spinner while waiting for the response
  toggleSpinner('loginBtn', 'loginSpinner', true);

  try {
    const response = await $.ajax({
      url: 'http://localhost:3000/api/auth/login',
      type: 'POST',
      data: JSON.stringify({ username, password }),
      contentType: 'application/json',
    });

    // Save the token and role in localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.role);

    // Redirect based on role
    if (response.role === 'admin') {
      window.location.href = 'admin-dashboard.html';
    } else if (response.role === 'staff') {
      window.location.href = 'staff-dashboard.html';
    } else {
      window.location.href = 'customer-home.html';
    }
  } catch (err) {
    $('#loginError').text(err.responseJSON?.message || 'Login failed.').show();
  } finally {
    toggleSpinner('loginBtn', 'loginSpinner', false);
  }
});

// Signup Form Submission (existing code)
$('#signupForm').on('submit', async function(event) {
  event.preventDefault();  // Prevent form from submitting the default way

  const newUsername = $('#newUsername').val();
  const email = $('#email').val();
  const phone = $('#phone').val();
  const newPassword = $('#newPassword').val();

  if (!newUsername || !email || !phone || !newPassword) {
    $('#signupError').text('All fields are required').show();
    return;
  }

  // Show spinner while waiting for the response
  toggleSpinner('signupBtn', 'signupSpinner', true);

  try {
    const response = await $.ajax({
      url: 'http://localhost:3000/api/auth/signup',
      type: 'POST',
      data: JSON.stringify({ username: newUsername, email, phone, password: newPassword }),
      contentType: 'application/json',
    });

    // Show success message and redirect to login page
    alert(response.message);
    window.location.href = 'login.html';
  } catch (err) {
    $('#signupError').text(err.responseJSON?.message || 'Signup failed.').show();
  } finally {
    toggleSpinner('signupBtn', 'signupSpinner', false);
  }
});

// Optional: Clear error messages when the user starts typing
$('#username, #password').on('input', function() {
  $('#loginError').hide();
});

$('#newUsername, #email, #phone, #newPassword').on('input', function() {
  $('#signupError').hide();
});

// Staff Dashboard: Fetch Orders and Display Them
async function fetchOrders() {
  try {
    const response = await $.ajax({
      url: 'http://localhost:3000/api/orders',  // Adjust to your backend endpoint
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token') // Send the JWT token for authorization
      },
    });
    displayOrders(response.orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
}

// Function to display orders dynamically in the staff dashboard
function displayOrders(orders) {
  const ordersList = document.getElementById('ordersList');
  ordersList.innerHTML = ''; // Clear existing list

  orders.forEach(order => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('col-md-4', 'mb-4');
    orderCard.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Order #${order.id}</h5>
          <p class="card-text">Customer: ${order.customerName}</p>
          <p class="card-text">Status: <span class="badge badge-${order.status === 'Pending' ? 'warning' : 'success'}">${order.status}</span></p>
          <button class="btn btn-primary" onclick="updateOrderStatus(${order.id}, 'Delivered')">Mark as Delivered</button>
        </div>
      </div>
    `;
    ordersList.appendChild(orderCard);
  });
}

// Update order status (Mark as Delivered)
async function updateOrderStatus(orderId, status) {
  try {
    const response = await $.ajax({
      url: `http://localhost:3000/api/orders/${orderId}`,
      type: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token') // Send the JWT token
      },
      data: JSON.stringify({ status }),
      contentType: 'application/json',
    });
    alert('Order updated successfully!');
    fetchOrders();  // Reload orders to show updated statuses
  } catch (err) {
    console.error("Error updating order status:", err);
    alert('Failed to update order status.');
  }
}

// Admin Dashboard: Fetch Dashboard Data
async function fetchDashboardData() {
  try {
    const response = await $.ajax({
      url: 'http://localhost:3000/api/dashboard',  // Adjust to your backend endpoint
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token') // Send the JWT token
      },
    });
    displayDashboardData(response);
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
  }
}

// Function to display dashboard data for the admin
function displayDashboardData(data) {
  const totalOrders = document.getElementById('totalOrders');
  const totalRevenue = document.getElementById('totalRevenue');
  const ordersThisMonth = document.getElementById('ordersThisMonth');

  totalOrders.innerText = data.totalOrders;
  totalRevenue.innerText = data.totalRevenue;
  ordersThisMonth.innerText = data.ordersThisMonth;
}

// Function to generate pizza options dynamically (for customer home page)
function generatePizzaOptions() {
  const pizzaContainer = document.getElementById('pizzaContainer');
  pizzas.forEach(pizza => {
    const pizzaCard = document.createElement('div');
    pizzaCard.classList.add('col-md-3', 'mb-4');
    pizzaCard.innerHTML = `
      <div class="card">
        <img src="../assets/images/${pizza.img}" class="card-img-top" alt="${pizza.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${pizza.name}</h5>
          <button class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    `;
    pizzaContainer.appendChild(pizzaCard);
  });
}
// Burger Menu Toggle for Mobile View
const burger = document.getElementById('navbar-burger');
const navbarLinks = document.querySelector('.navbar-links');

burger.addEventListener('click', () => {
  navbarLinks.classList.toggle('active'); // Toggle the active class to show/hide menu
});


// Call the fetchOrders function when the staff dashboard page loads
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('role') !== 'staff') {
    window.location.href = 'login.html'; // Redirect if not staff
  } else {
    fetchOrders();  // Load orders when staff dashboard is accessed
  }

  // Call fetchDashboardData when the admin dashboard page loads
  if (localStorage.getItem('role') === 'admin') {
    fetchDashboardData();
  }

  // Call pizza generation functions for the customer home page (if applicable)
  generatePizzaOptions();
});
