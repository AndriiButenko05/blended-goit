//Допоміжні функції
import refs from './refs.js';
import {
  getCategoryApi,
  productsApi,
  getProductById,
  searchProduct,
  categoryListApi
} from './products-api.js';
import {
  renderProducts,
  renderModal,
  renderProductsCart,
  renderProductsSWishlist,
  renderCategories
} from './render-function.js';
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
  setProductPrice,
  updatePriceCart,
  getProductPrice,
  wishlistArr,
  wishlistKey,
  getProductWishlist,
  setProductWishlist,
  checkStorageWishlist,
  themeKey,
} from './storage.js';

export function clearSearch() {
  refs.input.value = '';
}

export function displayCategories() {
  categoryListApi()
  .then(res => {
    const categories = ['All', ...res.data];
    refs.categoryList.insertAdjacentHTML(
      'beforeend',
      renderCategories(categories)
    );
  })
  .catch(error => alert(error.message));
}

export function displayProducts() {
  productsApi()
  .then(res => {
    refs.productList.insertAdjacentHTML(
      'beforeend',
      renderProducts(res.data.products)
    );
  })
  .catch(error => alert(error.message));
}