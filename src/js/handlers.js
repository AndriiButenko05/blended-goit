// Функції, які передаються колбеками в addEventListners
import {
  getCategoryApi,
  productsApi,
  getProductById,
  searchProduct,
} from './products-api.js';
import refs from './refs.js';
import { renderProducts, renderModal } from './render-function.js';
import { openModal, closeModal } from './modal.js';

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
      openModal();
      console.log(res);
      refs.modalProduct.insertAdjacentHTML('beforeend', renderModal(res.data));
    })
    .catch(error => alert(error.message));
}

export function handleCloseClick() {
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
