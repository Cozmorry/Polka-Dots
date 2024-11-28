// Ensure that jQuery is available on the frontend HTML file.
$('#loginForm').on('submit', async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const username = $('#username').val(); // Get username from the input field
    const password = $('#password').val(); // Get password from the input field

    // Simple form validation
    if (!username || !password) {
        alert('Please fill in both username and password.');
        return;
    }

    // Show loading spinner while the request is being processed
    $('#loginBtn').prop('disabled', true).text('Logging in...');  // Disable the button to prevent multiple clicks

    try {
        // AJAX request to the backend login API
        const response = await $.ajax({
            url: 'http://localhost:3000/api/auth/login', // Backend login API endpoint
            type: 'POST',
            data: JSON.stringify({ username, password }), // Sending username and password as JSON
            contentType: 'application/json', // Ensure that the server understands the request format
        });

        // On success, store the token and role in localStorage
        localStorage.setItem('token', response.token); // Save JWT token
        localStorage.setItem('role', response.role); // Save role (admin, staff, customer)

        // Show success message
        alert(response.message);

        // Redirect based on the role
        if (response.role === 'admin') {
            window.location.href = 'admin-dashboard.html'; // Redirect to admin dashboard
        } else if (response.role === 'staff') {
            window.location.href = 'staff-dashboard.html'; // Redirect to staff dashboard
        } else {
            window.location.href = 'customer-home.html'; // Redirect to customer dashboard
        }
    } catch (err) {
        // Handle errors and show appropriate message
        const errorMessage = err.responseJSON?.message || 'Login failed. Please try again.';
        alert('Error: ' + errorMessage);
    } finally {
        // Re-enable the button after the request is completed
        $('#loginBtn').prop('disabled', false).text('Login');  // Re-enable the button
    }
});
