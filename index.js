import"./assets/styles-BK7AYJoX.js";import{a as n}from"./assets/vendor-N5iQpiFS.js";const o={categoryList:document.querySelector(".categories"),link:"https://dummyjson.com/products",productList:document.querySelector(".products"),modalProduct:document.querySelector(".modal-product"),modalWindow:document.querySelector(".modal"),modalClose:document.querySelector(".modal__close-btn"),searchForm:document.querySelector(".search-form"),clearBtn:document.querySelector(".search-form__btn-clear"),input:document.querySelector(".search-form__input"),notFound:document.querySelector(".not-found")};async function p(){const t=o.link;return await n(`${t}/category-list`)}async function l(){const r=o.link;return await n(`${r}?limit=12&skip=${0*12}`)}async function m(t){const r=o.link;return await n(`${r}/category/${t}`)}async function _(t){const r=o.link;return await n(`${r}/${t}`)}async function g(t){const r=o.link;return await n(`${r}/search?q=${t}&limit=12`)}function f(t){return t.map(r=>`<li class="categories__item">
   <button class="categories__btn" type="button">${r}</button>
 </li>`).join("")}function s(t){return t.map(({id:r,title:e,brand:c,category:a,price:i,images:d})=>`<li class="products__item" data-id="${r}">
    <img class="products__image" src="${d[0]}" alt="${e}"/>
    <p class="products__title">${e}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${c}</span></p>
    <p class="products__category">Category: ${a}</p>
    <p class="products__price">Price: ${i}$</p>
 </li>
`).join("")}function y(t){const{title:r,price:e,images:c,returnPolicy:a,shippingInformation:i,description:d,tags:u}=t;return`<img class="modal-product__img" src="${c[0]}" alt="${r}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${r}</p>
        <ul class="modal-product__tags">${u}</ul>
        <p class="modal-product__description">${d}</p>
        <p class="modal-product__shipping-information">Shipping: ${i}</p>
        <p class="modal-product__return-policy">Return Policy: ${a}</p>
        <p class="modal-product__price">Price: ${e}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
`}function h(){o.modalWindow.classList.add("modal--is-open")}function b(){o.modalProduct.innerHTML="",o.modalWindow.classList.remove("modal--is-open")}function L(t){if(!t.target.closest("button"))return;document.querySelectorAll(".categories__btn").forEach(e=>e.classList.remove("categories__btn--active")),t.target.classList.add("categories__btn--active"),t.target.textContent==="All"&&l().then(e=>{o.productList.insertAdjacentHTML("beforeend",s(e.data.products))}).catch(e=>alert(e.message)),m(t.target.textContent).then(e=>{const c=o.productList;c.innerHTML=s(e.data.products)}).catch(e=>alert(e.message))}function $(t){if(!t.target.closest("li"))return;const r=t.target.closest("li").dataset.id;_(r).then(e=>{h(),console.log(e),o.modalProduct.insertAdjacentHTML("beforeend",y(e.data))}).catch(e=>alert(e.message))}function k(){b()}function v(t){if(t.preventDefault(),o.productList.innerHTML="",document.querySelectorAll(".categories__btn").forEach(e=>e.classList.remove("categories__btn--active")),o.input.value.trim()===""){alert("Please write correct product name"),o.searchForm.reset();return}g(o.input.value).then(e=>{if(e.data.products.length===0){o.notFound.classList.add("not-found--visible"),o.searchForm.reset();return}o.productList.insertAdjacentHTML("beforeend",s(e.data.products)),o.notFound.classList.remove("not-found--visible")}).catch(e=>alert(e.message)),o.searchForm.reset()}function P(){o.input.value=""}p().then(t=>{const r=["All",...t.data];o.categoryList.insertAdjacentHTML("beforeend",f(r))}).catch(t=>alert(t.message));l().then(t=>{o.productList.insertAdjacentHTML("beforeend",s(t.data.products))}).catch(t=>alert(t.message));o.categoryList.addEventListener("click",L);o.productList.addEventListener("click",$);o.modalClose.addEventListener("click",k);o.clearBtn.addEventListener("click",P);o.searchForm.addEventListener("submit",v);
//# sourceMappingURL=index.js.map
