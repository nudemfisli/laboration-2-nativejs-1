document.addEventListener('DOMContentLoaded', () => {
    fetchNewArrivals();
    displayBestsellerProducts();
});

async function fetchNewArrivals() {
    console.log('fetchNewArrivals körs');
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// NEW ARRIVALS
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    const productItem = document.getElementsByClassName('product-item');
    productList.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        if (products[i]) {
            const product = products[i];

            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
            <div class="card" style="width: 18rem; height: 500px">
                <img src="${product.image_link}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <button class="btn btn-primary add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;

            productList.appendChild(productItem);
        }
    }
}

// BESTSELLERS

// Function to fetch and display random products in the Bestseller section
async function displayBestsellerProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched products:', data);

        // Get random products from the fetched data
        const randomProducts = getRandomProducts(data, 4);

        // Clear the current list of products in the UI
        const bestsellerList = document.getElementById('bestseller-list');
        bestsellerList.innerHTML = '';

        // Loop through the random products and append them to the DOM
        randomProducts.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <div class="card" style="width: 18rem; height: 500px">
                    <img src="${product.image_link}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p>Price: $${product.price}</p>
                        <button class="btn btn-primary add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;

            bestsellerList.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
function getRandomProducts(products, n) {
    const randomProducts = [];
    while (randomProducts.length < n) {
        const randomIndex = Math.floor(Math.random() * products.length);
        const randomProduct = products[randomIndex];

        if (!randomProducts.includes(randomProduct)) {
            randomProducts.push(randomProduct);
        }
    }
    return randomProducts;
}

// SHOP BY CATEGORY
const lipstickCard = document.getElementById('lipstick-card');
const foundationCard = document.getElementById('foundation-card');
const mascaraCard = document.getElementById('mascara-card');

lipstickCard.addEventListener('click', function () {
    document.location.href = 'categorypage.html?category=lipstick';
});

foundationCard.addEventListener('click', function () {
    document.location.href = 'categorypage.html?category=foundation';
});

mascaraCard.addEventListener('click', function () {
    document.location.href = 'categorypage.html?category=mascara';
});

// BACK TO TOP BUTTON
const myBtn = document.getElementById('my-Btn');
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (window.scrollY > 700) {
        myBtn.style.display = 'block';
    } else {
        myBtn.style.display = 'none';
    }
}

myBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
