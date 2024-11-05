document.addEventListener('DOMContentLoaded', () => {
    fetchNewArrivals();
});

async function fetchNewArrivals() {
    console.log('fetchNewArrivals körs');
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw newError(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    const productItem = document.getElementById('product-item');
    productList.innerHTML = '';

    for (let i = 0; i < 4; i++) {
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

const lipstickCard = document.getElementById('lipstick-card');
const foundationCard = document.getElementById('foundation-card');
const mascaraCard = document.getElementById('mascara-card');

lipstickCard.addEventListener('click', function () {
    document.location.href = 'categorypage.html';
});

foundationCard.addEventListener('click', function () {
    document.location.href = 'categorypage.html';
});

mascaraCard.addEventListener('click', function () {
    document.location.href = 'categorypage.html';
});
