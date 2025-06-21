// Функції для роботи з бекендом
import axios from 'axios';
import refs from '/js/refs.js';

export async function categoryListApi() {
  const link = refs.link;
  const response = await axios(`${link}/category-list`);
  return response;
}

export async function productsApi() {
  const currentPage = 1;
  const link = refs.link;
  const response = await axios(
    `${link}?limit=12&skip=${(currentPage - 1) * 12}`
  );
  return response;
}

export async function getCategoryApi(text) {
  const link = refs.link;
  const response = await axios(`${link}/category/${text}`);
  return response;
}

export async function getProductById(id) {
  const link = refs.link;
  const response = await axios(`${link}/${id}`);
  return response;
}

export async function searchProduct(name) {
  const link = refs.link;
  const response = await axios(`${link}/search?q=${name}&limit=12`);
  return response;
}
