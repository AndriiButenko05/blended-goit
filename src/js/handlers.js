// Функції, які передаються колбеками в addEventListners
import {
  getCategoryApi,
  productsApi,
  getProductById,
  searchProduct,
} from './products-api.js';
import refs from './refs.js';
import { renderProducts, renderModal,renderProductsCart } from './render-function.js';
import { openModal, closeModal } from './modal.js';
import {
  key,
  array,
  setProductId,
  getProductId,
  checkStorage,
  updateCartCount,
  priceArr,
  priceKey,
  updatePrice,
  setProductPrice,
  getProductPrice
} from './storage.js';

let idProduct = null;
export function handleCategoryClick(event) {
  if (!event.target.closest('button')) {
    return;
  }
  const buttons = document.querySelectorAll('.categories__btn');
  buttons.forEach(btn => btn.classList.remove('categories__btn--active'));
  event.target.classList.add('categories__btn--active');

  if (event.target.textContent === 'All') {
    productsApi()
      .then(res => {
        refs.productList.insertAdjacentHTML(
          'beforeend',
          renderProducts(res.data.products)
        );
      })
      .catch(error => alert(error.message));
  }

  getCategoryApi(event.target.textContent)
    .then(res => {
      const productList = refs.productList;
      productList.innerHTML = renderProducts(res.data.products);
    })
    .catch(error => alert(error.message));
}

export function handleProductClick(event) {
  if (!event.target.closest('li')) {
    return;
  }
  const productId = event.target.closest('li').dataset.id;
  getProductById(productId)
    .then(res => {
      setProductId(productId);
      openModal();
      refs.modalProduct.insertAdjacentHTML('beforeend', renderModal(res.data));
      checkStorage(refs.addToCart);
    })
    .catch(error => alert(error.message));
}

export function handleCloseClick() {
  closeModal();
}
export function handleCloseClickCart() {
  refs.cartList.innerHTML = '';
  renderProductsCart();
  refs.itemCountCart.textContent = refs.cartCount.textContent;
  closeModal();
}

export function searchFrom(event) {
  event.preventDefault();
  refs.productList.innerHTML = '';
  const buttons = document.querySelectorAll('.categories__btn');
  buttons.forEach(btn => btn.classList.remove('categories__btn--active'));
  if (refs.input.value.trim() === '') {
    alert('Please write correct product name');
    refs.searchForm.reset();
    return;
  }
  searchProduct(refs.input.value)
    .then(res => {
      if (res.data.products.length === 0) {
        refs.notFound.classList.add('not-found--visible');
        refs.searchForm.reset();
        return;
      }
      refs.productList.insertAdjacentHTML(
        'beforeend',
        renderProducts(res.data.products)
      );
      refs.notFound.classList.remove('not-found--visible');
    })
    .catch(error => alert(error.message));
  refs.searchForm.reset();
}

export function addToCartClick(event) {
  const price = document.querySelector('.modal-product__price').textContent;
  const id = getProductId();
  if (!id) {
    alert('Error has occurred');
    return;
  }
  if (event.target.textContent === `Remove from Cart`) {
    const priceIndex = priceArr.indexOf(price);
    if (priceIndex > -1) {
      priceArr.splice(priceIndex, 1);
      localStorage.setItem(priceKey, JSON.stringify(priceArr));
    }
    const index = array.indexOf(id);
    if (index > -1) {
      array.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(array));
      refs.cartCount.textContent--;
      event.target.textContent = 'Add to Cart';
      return;
    }
  } else {
    event.target.textContent = "Remove from Cart";
    priceArr.push(price);
    array.push(id);
    localStorage.setItem(key, JSON.stringify(array));
    localStorage.setItem(priceKey, JSON.stringify(priceArr));
    refs.cartCount.textContent++
  }
}
export function removeFromCartClick(event) {
  const id = getProductId();
  if (!id) {
    alert('Error has occurred');
    return;
  }
  const index = array.indexOf(id);
  if (event.target.textContent === `Remove from Cart`) {
    const index = array.indexOf(id);
    const priceIndex = priceArr.indexOf(price);
    if (priceIndex > -1) {
      priceArr.splice(priceIndex, 1);
      localStorage.setItem(priceKey, JSON.stringify(priceArr));
    }
    if (index > -1) {
      array.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(array));
      refs.cartCount.textContent--;
      event.target.textContent = 'Add to Cart';
  
      updateCartCount();
      refs.itemCountCart.textContent = refs.cartCount.textContent
      return;
    }
  } else {
    event.target.textContent = "Remove from Cart";
    array.push(id);
    localStorage.setItem(key, JSON.stringify(array));
    refs.cartCount.textContent++;
    updateCartCount(); 
    refs.itemCountCart.textContent = refs.cartCount.textContent
  }
}