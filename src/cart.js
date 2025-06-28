//Логіка сторінки Cart
import {
  categoryListApi,
  productsApi,
  getProductById,
} from './js/products-api.js';
import refs from './js/refs.js';
import {
  renderCategories,
  renderProducts,
    renderCart,
    renderProductsCart
} from './js/render-function.js';
import {
  handleCategoryClick,
  handleProductClick,
  handleCloseClick,
  searchFrom,
    addToCartClick,
    removeFromCartClick,
    handleCloseClickCart
} from './js/handlers.js';
import { clearSearch } from './js/helpers.js';
import { key, array, updateCartCount,updatePriceCart } from './js/storage.js';

updateCartCount();

updatePriceCart();

renderProductsCart();

refs.itemCountCart.textContent = refs.cartCount.textContent;

refs.productList.addEventListener('click', handleProductClick);

refs.modalClose.addEventListener('click', handleCloseClickCart);

refs.addToCart.addEventListener('click', removeFromCartClick);

refs.searchForm.addEventListener('submit', searchFrom);



