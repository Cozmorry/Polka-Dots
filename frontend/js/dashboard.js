$(document).ready(function() {
    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if token is not available
        return;
    }

    // Show loading message while waiting for the API response
    $('#orderList').html('<p>Loading your orders...</p>');

    // Fetch dashboard data (orders) from the backend API
    $.ajax({
        url: 'http://localhost:3000/api/auth/dashboard', // Protected API route for dashboard
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token // Include JWT token in the Authorization header
        },
        success: function(response) {
            console.log(response);  // Log the response to the console (for debugging)
            const orders = response.orders || [];
            
            if (orders.length === 0) {
                $('#orderList').html('<p>You have no orders at the moment.</p>');
                return;
            }

            let ordersHtml = '<h3>Your Orders:</h3><ul>';
            orders.forEach(order => {
                ordersHtml += `<li>Order ID: ${order.id} - Status: ${order.status}</li>`;
            });
            ordersHtml += '</ul>';
            $('#orderList').html(ordersHtml);  // Display orders in the #orderList element
        },
        error: function(err) {
            const errorMessage = err.responseJSON ? err.responseJSON.message : 'An error occurred while fetching your orders.';
            alert('Error: ' + errorMessage);
            window.location.href = 'login.html'; // Redirect to login if the token is invalid or expired
        }
    });

    // Optionally, display user-specific info (like username or role)
    const role = localStorage.getItem('role');
    if (role) {
        $('#userRole').text(`Role: ${role}`); // Display user role on the dashboard
    }
});
