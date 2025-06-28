//Логіка сторінки Home
import { categoryListApi, productsApi } from './js/products-api.js';
import refs from './js/refs.js';
import { renderCategories, renderProducts } from './js/render-function.js';
import {
  handleCategoryClick,
  handleProductClick,
  handleCloseClick,
  searchFrom,
  addToCartClick,
} from './js/handlers.js';
import { clearSearch } from './js/helpers.js';
import { key ,array,updateCartCount,updatePrice} from './js/storage.js';

categoryListApi()
  .then(res => {
    const categories = ['All', ...res.data];
    refs.categoryList.insertAdjacentHTML(
      'beforeend',
      renderCategories(categories)
    );
  })
  .catch(error => alert(error.message));

productsApi()
  .then(res => {
    refs.productList.insertAdjacentHTML(
      'beforeend',
      renderProducts(res.data.products)
    );
  })
  .catch(error => alert(error.message));

updateCartCount()

updatePrice();

refs.categoryList.addEventListener('click', handleCategoryClick);

refs.productList.addEventListener('click', handleProductClick);

refs.modalClose.addEventListener('click', handleCloseClick);

refs.clearBtn.addEventListener('click', clearSearch);

refs.searchForm.addEventListener('submit', searchFrom);

refs.addToCart.addEventListener("click", addToCartClick);


