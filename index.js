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
            <a href="productpage.html?id=${product.id}" class="product-link">
                <div class="card" ">
                    <img src="${product.image_link}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p><b>Price: $${product.price}</b></p>
                        <button class="btn btn-primary add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </a>
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

        const randomProducts = getRandomProducts(data, 4);

        const bestsellerList = document.getElementById('bestseller-list');
        bestsellerList.innerHTML = '';

        randomProducts.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
            <a href="productpage.html?id=${product.id}" class="product-link">
                <div class="card"
                ">
                    <img src="${product.image_link}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p><b>Price: $${product.price}</b></p>
                        <button class="btn btn-primary add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </a>
        `;

            // Remove underline from product links
            const productLinks = document.querySelectorAll('.product-link');
            productLinks.forEach((link) => {
                link.style.textDecoration = 'none'; // Remove the underline
            });

            const buttons = document.querySelectorAll('.btn.add-to-cart');
            buttons.forEach((button) => {
                button.style.textDecoration = 'none';
                button.style.border = '1px solid black';
            });

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
