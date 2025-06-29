//Логіка сторінки Home
import refs from './js/refs.js';
import {
  handleCategoryClick,
  handleProductClick,
  handleCloseClick,
  searchFrom,
  addToCartClick,
  addToWishlistClick,
  scrollBtn,
  scrollUp,
  changeTheme,
  searchFormOnMain,
} from './js/handlers.js';
import { clearSearch, displayCategories } from './js/helpers.js';
import {
  updateCartCount,
  updatePrice,
  updateWishlistCount,
  applySavedTheme,
} from './js/storage.js';

applySavedTheme();

updateCartCount();

updateWishlistCount();

updatePrice();

displayCategories();

refs.categoryList.addEventListener('click', handleCategoryClick);

refs.productList.addEventListener('click', handleProductClick);

refs.modalClose.addEventListener('click', handleCloseClick);

refs.clearBtn.addEventListener('click', clearSearch);

refs.searchForm.addEventListener('submit', searchFrom);

document.addEventListener('DOMContentLoaded', searchFormOnMain);

refs.addToCart.addEventListener('click', addToCartClick);

refs.addToWishlist.addEventListener('click', addToWishlistClick);

window.addEventListener('scroll', scrollBtn);

refs.scrollUpBtn.addEventListener('click', scrollUp);

refs.changeTheme.addEventListener('change', changeTheme);
