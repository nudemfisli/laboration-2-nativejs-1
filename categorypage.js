document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    console.log('fetchProducts körs');
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
    const foundation = products.filter(
        (product) => product.category === 'foundation'
    );
    const lipstick = products.filter(
        (product) => product.category === 'lipstick'
    );
    const mascara = products.filter(
        (product) => product.category === 'mascara'
    );
    displayCategoryProducts('foundation-list', foundation);
    displayCategoryProducts('lipstick-list', lipstick);
    displayCategoryProducts('mascara-list', mascara);
}

function displayCategoryProducts(categoryId, products) {
    const productList = document.getElementById(categoryId);
    productList.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
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
                <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;

        const addToCartButton = productItem.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId); // Pass the product ID to the addToCart function
        });
        productList.appendChild(productItem);
    }
}

const myBtn = document.getElementById('my-Btn');
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (window.scrollY > 800) {
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
