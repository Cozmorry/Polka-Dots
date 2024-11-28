const pizzaCard = (name, description, image) => {
    return `
        <div class="pizza-card">
            <img src="${image}" alt="${name} Pizza">
            <div class="pizza-info">
                <h3>${name}</h3>
                <p>${description}</p>
                <button class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    `;
};

// Example usage (assumed pizza data)
document.querySelector('#pizza-menu').innerHTML = pizzaCard('Margherita Pizza', 'A classic with fresh mozzarella and basil.', 'images/margherita.jpg');
