const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log('Product ID from URL:', productId);

async function fetchProductDetails() {
    console.log('fetchProductDetails körs');
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        const product = data.find((p) => {
            console.log(`Comparing ${productId} with ${p.id}`);
            return String(p.id) === String(productId);
        });

        if (!product) {
            console.log('Product not found.');
            throw new Error('Product not found.');
        }

        document.getElementById('product-name').innerHTML = product.name;

        document.getElementById('product-description').innerHTML =
            product.description;

        document.getElementById(
            'product-price'
        ).innerHTML = `$${product.price}`;

        document.getElementById(
            'product-image'
        ).innerHTML = `<img src="${product.image_link}" alt="${product.name}" class="img-fluid" />`;
        fetchChartRatings(product);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchProductDetails();

// CHART

async function fetchChartRatings(product) {
    try {
        console.log('Fetching ratings for product...');

        const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        // Loop through the product's ratings and update the ratingCount
        product.ratings.forEach((rating) => {
            if (rating >= 1 && rating <= 5) {
                ratingCount[rating]++;
            }
        });

        console.log('Rating Count:', ratingCount);

        const labels = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
        const dataForChart = [
            ratingCount[1],
            ratingCount[2],
            ratingCount[3],
            ratingCount[4],
            ratingCount[5]
        ];

        const ctx = document.getElementById('ratings-chart');
        if (!ctx) {
            console.error('Chart canvas element not found');
            return;
        }

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: dataForChart,
                        backgroundColor: [
                            '#ffb3ba',
                            '#ffdfba',
                            '#ece6ff',
                            '#d2e7d6',
                            '#bae1ff'
                        ],
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching ratings data:', error);
    }
}

fetchProductDetails();
