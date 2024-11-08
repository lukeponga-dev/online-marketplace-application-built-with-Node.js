// public/js/products.js

fetch('http://localhost:3000/products', {
    credentials: 'include',
  })
    .then(response => response.json())
    .then(data => {
      // Display products on the page
    })
    .catch(error => console.error('Error fetching products:', error));
  