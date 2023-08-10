
   function createProductFromTemplate(item) {
    const template = document.querySelector('#product');
    const product = template.content.cloneNode(true);
 
    product.querySelector('h2').innerText = item.name;
    product.querySelector('.description').innerText = item.description;
    product.querySelector('[name=id]').value = item.sku;
    product.querySelector('.price').innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: item.currency,
    }).format(item.amount);
 
    const img = product.querySelector('img');
    img.src = item.image;
    img.alt = item.name;
 
    return product;
  }
  export async function loadProducts() {
    const data = await fetch('/.netlify/functions/get-products')
      .then((res) => res.json())
      .catch((err) => console.error(err));
  
    const container = document.querySelector('.show');
  
//     // TODO: add markup to display the products
//     const pre = document.createElement('pre');
//     pre.innerText = JSON.stringify(data, null, 2);
  
//     container.appendChild(pre);
//  
data.forEach((item) => {
    const product = createProductFromTemplate(item);

    container.appendChild(product);
  });
 }