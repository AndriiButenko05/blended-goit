//Функцію для створення, рендеру або видалення розмітки
import refs from './refs.js';
import { key } from './storage.js';
import { getProductById } from './products-api.js';
export function renderCategories(arr) {
  return arr
    .map(
      item =>
        `<li class="categories__item">
   <button class="categories__btn" type="button">${item}</button>
 </li>`
    )
    .join('');
}

export function renderProducts(arr) {
  return arr
    .map(
      ({ id, title, brand, category, price, images }) =>
        `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${images[0]}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>
`
    )
    .join('');
}

export function renderModal(arr) {
  const {
    id,
    title,
    price,
    images,
    returnPolicy,
    shippingInformation,
    description,
    tags,
  } = arr;
  return `<img class="modal-product__img" src="${images[0]}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tags}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price" data-price="${price}">Price: ${price}$</p>
      </div>
`;
}
export function renderProductsCart() {
  const productId = JSON.parse(localStorage.getItem(key));
  productId.forEach(element => {
    getProductById(element)
      .then(res => {
        refs.cartList.insertAdjacentHTML('beforeend', renderCart(res.data));
      })
      .catch(error => console.log(error.message));
  });
}
export function renderCart(arr) {
  const { id, title, price, images, brand, category } = arr;
  return `<li class="products__item" data-id="${id}">
  <img class="products__image" src="${images[0]}" alt="${title}"/>
  <p class="products__title">${title}</p>
  <p class="products__brand"><span class="products__brand--bold">Brand:${brand}</span></p>
  <p class="products__category">Category: ${category}</p>
  <p class="products__price" data-price="${price}">Price: ${price}$</p>
</li>
`;
}
