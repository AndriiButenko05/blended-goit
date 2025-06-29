const refs = {
  categoryList: document.querySelector('.categories'),
  link: 'https://dummyjson.com/products',
  productList: document.querySelector('.products'),
  modalProduct: document.querySelector('.modal-product'),
  modalWindow: document.querySelector('.modal'),
  modalClose: document.querySelector('.modal__close-btn'),
  searchForm: document.querySelector('.search-form'),
  clearBtn: document.querySelector('.search-form__btn-clear'),
  input: document.querySelector('.search-form__input'),
  notFound: document.querySelector('.not-found'),
  addToCart: document.querySelector(".modal-product__btn--cart"),
  addToWishlist: document.querySelector(".modal-product__btn--wishlist"),
  cartCount: document.querySelector(".nav__count"),
  cartList: document.querySelector(".products"),
  itemCountCart: document.querySelector(".cart-summary__value"),
  itemCostCart: document.querySelector(`.price_total`),
  addToWishlist: document.querySelector('.modal-product__btn--wishlist'),
  wishlistCount: document.querySelector("[data-wishlist-count]"),
  scrollUpBtn: document.getElementById('scrollUpBtn'),
  changeTheme: document.querySelector('.switch .input')
};
export default refs;
