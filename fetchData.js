import fetch from 'node-fetch';
import fs from 'fs';

const apiUrl = 'http://makeup-api.herokuapp.com/api/v1/products.json';

fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // Write to db.json
        const products = { products: data };
        fs.writeFileSync('db.json', JSON.stringify(products, null, 2));
        console.log('Database populated with Makeup API data!');
    })
    .catch((error) => console.error('Error fetching data:', error));
