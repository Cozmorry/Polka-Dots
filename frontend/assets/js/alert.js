// Function to display a success notification
const showNotification = (message) => {
    const notification = document.querySelector('.notification');
    const messageContainer = notification.querySelector('.message');
    messageContainer.textContent = message;
    notification.style.display = 'block';

    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
};

// Example usage
showNotification('Your order has been placed successfully!');
