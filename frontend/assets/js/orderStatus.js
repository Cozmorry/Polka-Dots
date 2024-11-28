// Example order status
const orderStatus = 'In Transit'; // This would typically come from a database

const updateOrderStatus = () => {
    const statusContainer = document.querySelector('.order-status p');
    const progressBar = document.querySelector('.progress-bar');

    statusContainer.innerHTML = `Your order is currently <strong>${orderStatus}</strong>`;

    let progress = 0;
    switch(orderStatus) {
        case 'Pending':
            progress = 20;
            break;
        case 'In Transit':
            progress = 60;
            break;
        case 'Delivered':
            progress = 100;
            break;
        default:
            progress = 0;
    }

    progressBar.style.width = `${progress}%`;
};

// Call the function to update the status
updateOrderStatus();
