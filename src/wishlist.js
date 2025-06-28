//Логіка сторінки Wishlist
import refs from './js/refs.js';
import { renderProductsSWishlist } from './js/render-function.js';
import {
  handleProductClick,
  searchFrom,
  removeFromCartClick,
  addToWishlistClick,
    handleCloseClickWishlist,
    scrollBtn,
    scrollUp,
    changeTheme
} from './js/handlers.js';
import { clearSearch } from './js/helpers.js';
import {
  updateCartCount,
  updatePrice,
  updateWishlistCount,
} from './js/storage.js';

updateCartCount();

updateWishlistCount();

updatePrice();

renderProductsSWishlist();

refs.productList.addEventListener('click', handleProductClick);

refs.modalClose.addEventListener('click', handleCloseClickWishlist);

refs.clearBtn.addEventListener('click', clearSearch);

refs.addToCart.addEventListener('click', removeFromCartClick);

refs.searchForm.addEventListener('submit', searchFrom);

refs.addToWishlist.addEventListener('click', addToWishlistClick);

window.addEventListener('scroll', scrollBtn)

refs.scrollUpBtn.addEventListener('click', scrollUp);

refs.changeTheme.addEventListener('click', changeTheme);