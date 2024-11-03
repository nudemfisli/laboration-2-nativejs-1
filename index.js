document.addEventListener('DOMContentLoaded', () => {
    fetchNewArrivals();
});

function fetchNewArrivals() {
    fetch('http://localhost:3000/products')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Fetched data:', data);
            displayProducts(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        if (products[i]) {
            const product = products[i];
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <img src="${product.image_link}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;

            productList.appendChild(productItem);
        }
    }
}
