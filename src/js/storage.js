//Робота з loacalStorage
import refs from './refs.js';

export const key = 'cart';
export let array = [];
export const productKey = 'currentProductId';
export const getPriceKey = `currentProductPrice`;
export const priceKey = "price";
export const priceArr = [];

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

export function checkStorage(event) {
    if (array.includes(localStorage.getItem(productKey))) {
        event.textContent = `Remove from Cart`
    } else {
         event.textContent = `Add to Cart`
    }
}
export function updateCartCount() {
  try {
    const idArr = JSON.parse(localStorage.getItem(key)) || [];

    // Обнуляем текущие значения
    array.length = 0;
    refs.cartCount.textContent = 0;

    idArr.forEach(item => {
      array.push(item);
    });

    refs.cartCount.textContent = array.length;

  } catch (error) {
    alert(error)
  }
}
export function updatePriceCart() {
  try {
    const idArr = JSON.parse(localStorage.getItem(priceKey)) || [];
    priceArr.length = 0;

    // Начальная сумма
    let total = 0;

    idArr.forEach(str => {
      // Преобразуем строку вида "Price: 24999.99$" в число
      const price = parseFloat(str.replace(/[^\d.]/g, ''));

      if (!isNaN(price)) {
        priceArr.push(price);       // Сохраняем чистое число
        total += price;             // Прибавляем к сумме
      }
    });

    // Обновляем отображаемую цену
    refs.itemCostCart.textContent =`$${total.toFixed(2)}`; 
  } catch (error) {
    alert(error)
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
    alert(error)
  }
}