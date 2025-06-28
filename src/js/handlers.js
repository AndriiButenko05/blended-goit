// Функції, які передаються колбеками в addEventListners
import {
  getCategoryApi,
  productsApi,
  getProductById,
  searchProduct,
} from './products-api.js';
import refs from './refs.js';
import {
  renderProducts,
  renderModal,
  renderProductsCart,
  renderProductsSWishlist,
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
} from './storage.js';

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
  const productElement = event.target.closest('li');
  const productId = productElement.dataset.id;
  const productPrice =
    productElement.querySelector('.products__price').textContent;
  const formatPrice = parseFloat(productPrice.replace(/[^\d.]/g, ''));
  getProductById(productId)
    .then(res => {
      setProductId(productId);
      setProductPrice(formatPrice);
      setProductWishlist(productId);
      openModal();
      refs.modalProduct.insertAdjacentHTML('beforeend', renderModal(res.data));
      checkStorage(refs.addToCart);
      checkStorageWishlist(refs.addToWishlist);
    })
    .catch(error => alert(error.message));
}

export function handleCloseClick() {
  closeModal();
}
export function handleCloseClickCart() {
  refs.cartList.innerHTML = '';
  renderProductsCart();
  closeModal();
}
export function handleCloseClickWishlist() {
  refs.cartList.innerHTML = '';
  renderProductsSWishlist();
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
  const price = parseInt(getProductPrice());
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
    event.target.textContent = 'Remove from Cart';
    priceArr.push(price);
    array.push(id);
    localStorage.setItem(key, JSON.stringify(array));
    localStorage.setItem(priceKey, JSON.stringify(priceArr));
    refs.cartCount.textContent++;
  }
}
export function removeFromCartClick(event) {
  const id = getProductId();
  const price = parseInt(getProductPrice());
  if (!id) {
    alert('Error has occurred');
    return;
  }
  if (event.target.textContent === `Remove from Cart`) {
    const index = array.indexOf(id);
    const indexPrice = priceArr.indexOf(price);
    if (index > -1) {
      array.splice(index, 1);
      priceArr.splice(indexPrice, 1);
      localStorage.setItem(key, JSON.stringify(array));
      localStorage.setItem(priceKey, JSON.stringify(priceArr));
      refs.cartCount.textContent--;
      event.target.textContent = 'Add to Cart';
      updatePriceCart();
      updateCartCount();
      return;
    }
  } else {
    event.target.textContent = 'Remove from Cart';
    priceArr.push(parseInt(price));
    array.push(id);
    localStorage.setItem(key, JSON.stringify(array));
    localStorage.setItem(priceKey, JSON.stringify(priceArr));
    refs.cartCount.textContent++;
    updateCartCount();
    updatePriceCart();
    refs.itemCountCart.textContent = refs.cartCount.textContent;
  }
}

export function addToWishlistClick(event) {
  console.log(refs.wishlistCount.textContent);

  const id = getProductWishlist();
  if (!id) {
    alert('Error has occurred');
    return;
  }
  if (event.target.textContent === `Remove from Wishlist`) {
    const index = wishlistArr.indexOf(id);
    if (index > -1) {
      wishlistArr.splice(index, 1);
      localStorage.setItem(wishlistKey, JSON.stringify(wishlistArr));
      refs.wishlistCount.textContent--;
      event.target.textContent = 'Add to Wishlist';
      return;
    }
  } else {
    event.target.textContent = 'Remove from Wishlist';
    wishlistArr.push(id);
    localStorage.setItem(wishlistKey, JSON.stringify(wishlistArr));
    refs.wishlistCount.textContent++;
  }
}
export function scrollBtn() {
  if (window.scrollY > 300) {
    refs.scrollUpBtn.style.display = 'block';
  } else {
    refs.scrollUpBtn.style.display = 'none';
  }
}
export function scrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function changeTheme() {
  document.body.classList.toggle('body-dark-theme');
}
