//Логіка сторінки Cart
import refs from './js/refs.js';
import { renderProductsCart } from './js/render-function.js';
import {
  handleProductClick,
  searchFrom,
  removeFromCartClick,
  handleCloseClickCart,
  addToWishlistClick,
  scrollBtn,
  scrollUp,
  changeTheme,
} from './js/handlers.js';
import { clearSearch } from './js/helpers.js';
import {
  updateCartCount,
  updatePriceCart,
  updateWishlistCount,
  applySavedTheme,
} from './js/storage.js';

applySavedTheme();

updateCartCount();

updatePriceCart();

updateWishlistCount();

renderProductsCart();

refs.productList.addEventListener('click', handleProductClick);

refs.modalClose.addEventListener('click', handleCloseClickCart);

refs.clearBtn.addEventListener('click', clearSearch);

refs.addToCart.addEventListener('click', removeFromCartClick);

refs.searchForm.addEventListener('submit', searchFrom);

refs.addToWishlist.addEventListener('click', addToWishlistClick);

window.addEventListener('scroll', scrollBtn);

refs.scrollUpBtn.addEventListener('click', scrollUp);

refs.changeTheme.addEventListener('change', changeTheme);
