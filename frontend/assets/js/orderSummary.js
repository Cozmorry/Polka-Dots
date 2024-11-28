// Example data
const orderData = [
    { item: 'Margherita Pizza', price: 12 },
    { item: 'Extra Cheese', price: 2 },
    { item: 'Pepsi', price: 3 },
];

// Function to display the order summary
const displayOrderSummary = () => {
    const orderSummaryContainer = document.querySelector('.order-summary ul');
    const totalPriceContainer = document.querySelector('.order-summary .total');

    let totalPrice = 0;
    orderSummaryContainer.innerHTML = ''; // Clear previous items

    orderData.forEach(order => {
        const listItem = document.createElement('li');
        listItem.textContent = `${order.item} - $${order.price}`;
        orderSummaryContainer.appendChild(listItem);
        totalPrice += order.price;
    });

    totalPriceContainer.innerHTML = `<p><strong>Total: $${totalPrice}</strong></p>`;
};

// Call the function to populate the order summary
displayOrderSummary();
