//Робота з loacalStorage
import refs from './refs.js';

export const key = 'cart';
export let array = [];
export const productKey = 'currentProductId';
export const getPriceKey = `currentProductPrice`;
export const priceKey = 'price';
export const priceArr = [];
export const wishlistKey = 'wishlist'
export const wishlistArr = [];
export const wishlistKeyCurrent = 'currentWishlist'
export const themeKey =`currentTheme`

export async function setProductId(id) {
  try {
    localStorage.setItem(productKey, id);
  } catch (error) {
    alert(error);
  }
}
export async function setProductPrice(id) {
  try {
    localStorage.setItem(getPriceKey, id);
  } catch (error) {
    alert(error);
  }
}
export async function setProductWishlist(id) {
  try {
    localStorage.setItem(wishlistKeyCurrent, id);
  } catch (error) {
    alert(error);
  }
}
export function getProductId() {
  try {
    return localStorage.getItem(productKey);
  } catch (error) {
    alert(error);
    return null;
  }
}
export function getProductPrice() {
  try {
    return localStorage.getItem(getPriceKey);
  } catch (error) {
    alert(error);
    return null;
  }
}
export function getProductWishlist() {
  try {
    return localStorage.getItem(wishlistKeyCurrent);
  } catch (error) {
    alert(error);
    return null;
  }
}

export function checkStorage(event) {
  if (array.includes(localStorage.getItem(productKey))) {
    event.textContent = `Remove from Cart`;
  } else {
    event.textContent = `Add to Cart`;
  }
}
export function checkStorageWishlist(event) {
  if (wishlistArr.includes(localStorage.getItem(wishlistKeyCurrent))) {
    event.textContent = `Remove from Wishlist`;
  } else {
    event.textContent = `Add to Wishlist`;
  }
}
export function updateCartCount() {
  try {
    const idArr = JSON.parse(localStorage.getItem(key)) || [];
    array.length = 0;
    refs.cartCount.textContent = 0;

    idArr.forEach(item => {
      array.push(item);
    });

    refs.cartCount.textContent = array.length;
    if (window.location.pathname.endsWith('cart.html')) {
      refs.itemCountCart.textContent = array.length;
    }
  } catch (error) {
    alert(error);
  }
}
export function updatePriceCart() {
  try {
    const priceArray = JSON.parse(localStorage.getItem(priceKey)) || [];
    priceArr.length = 0;
    let total = 0;
    refs.itemCostCart.textContent = '$0';
    priceArray.forEach(item => {
      const price = parseInt(item);
      priceArr.push(price);
      total += price;
    });
    refs.itemCostCart.textContent = `$${Number.parseFloat(total).toFixed(2)}`;
  } catch (error) {
    alert(error);
  }
}
export function updatePrice() {
  try {
    const idArr = JSON.parse(localStorage.getItem(priceKey)) || [];
    priceArr.length = 0;
    idArr.forEach(item => {
      priceArr.push(item);
    });
  } catch (error) {
    alert(error);
  }
}
export function updateWishlistCount() {
  try {
    const idArr = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    wishlistArr.length = 0;
    refs.wishlistCount.textContent = 0;
    idArr.forEach(item => {
      wishlistArr.push(item);
    });
    refs.wishlistCount.textContent = wishlistArr.length;
  } catch (error) {
    alert(error);
  }
}
export function applySavedTheme() {
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme === 'dark') {
    document.body.classList.add('body-dark-theme');
    if (refs.changeTheme) refs.changeTheme.checked = true; // Move switch to right
  } else {
    document.body.classList.remove('body-dark-theme');
    if (refs.changeTheme) refs.changeTheme.checked = false; // Move switch to left
  }
}