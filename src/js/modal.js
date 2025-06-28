//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import refs from './refs.js';

export function openModal() {
  refs.modalWindow.classList.add('modal--is-open');
}

export function closeModal() {
  refs.modalProduct.innerHTML = '';
  refs.modalWindow.classList.remove('modal--is-open');
}

