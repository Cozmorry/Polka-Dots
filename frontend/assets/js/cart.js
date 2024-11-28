// Example cart data
const cartData = [
    { item: 'Margherita Pizza', price: 12 },
    { item: 'Extra Cheese', price: 2 },
    { item: 'Pepsi', price: 3 },
];

const displayCart = () => {
    const cartContainer = document.querySelector('.cart ul');
    const totalContainer = document.querySelector('.cart .total');

    let totalPrice = 0;
    cartContainer.innerHTML = ''; // Clear previous items

    cartData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.item} - $${item.price}`;
        cartContainer.appendChild(listItem);
        totalPrice += item.price;
    });

    totalContainer.innerHTML = `<p><strong>Total: $${totalPrice}</strong></p>`;
};

// Call the function to populate the cart
displayCart();
