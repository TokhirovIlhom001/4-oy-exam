const root = document.getElementById('root');
const badge = document.getElementById('badge');
const productMainPrice = document.querySelector('.product-price');
const modalBody = document.querySelector('.modal-body');
const total = document.getElementById('total');
const input = document.getElementById('input');
const select = document.getElementById('select');
const modal = document.querySelector('.modal');
const form = document.querySelector('#form');
const elCartModal = document.querySelector('.modal');

// Filter
const filtBtn = document.querySelectorAll('.filt-btn');
filtBtn.forEach((element, idx) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    if (element.id === 'pishloqli') {
      root.innerHTML = '';
      fetchAll('http://localhost:7777/pishloqli');
    } else if (element.id === 'gushtli') {
      root.innerHTML = '';
      fetchAll('http://localhost:7777/goshtli');
    } else if (element.id === 'quziqorinli') {
      root.innerHTML = '';
      fetchAll('  http://localhost:7777/qoziqorinli');
    } else if (element.id === 'achchiq') {
      root.innerHTML = '';
      fetchAll('http://localhost:7777/achchiq');
    } else if (element.id === 'barchasi') {
      root.innerHTML = '';
      fetchAll('http://localhost:7777/barcha-pitsalar');
    }
  });
});

// end filter

let korzinka = [];
let barcha = [];
let pitsalar = [];
// Input search
input.addEventListener('input', (e) => {
  if (input.value === '') {
    fetchAll('http://localhost:7777/barcha-pitsalar');
  }
  e.preventDefault();
  let sortedProducts = barcha.filter((v) =>
    v.title.toLowerCase().includes(input.value.toLowerCase())
  );
  console.log(sortedProducts);
  root.innerHTML = '';
  render(sortedProducts);
});

async function fetchAll(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  barcha = data;
  pitsalar = data;
  render(barcha);
}
fetchAll('http://localhost:7777/barcha-pitsalar');

if (input.value === '') {
  fetchAll();
}

// let elCard = document.querySelector(".card");
// let elBoxCards = document.querySelector("#root");

// elBoxCards.addEventListener("click", (evt) => {
//   console.log(evt.target.parentNode);
// });

function render(arr) {
  let res = '';
  arr.forEach((product) => {
    res += `
    <div class="col-3 p-3" >
            <img style="height: 140px; width: 250px; margin: 10px;" src="${
              product.image
            }" class="card-img-top" alt="${product.image}">
        
                <h3 class="card-h3 text-center">${product.title}</h3>
                <h4  class="card-p text-center">${product.description}</h4>
                <button onclick="addToBag(${
                  product.id - 1
                })"  class="card-btn d-block mx-auto mt-3">${
      product.price
    }</button>
    </div>`;
  });
  root.innerHTML += res;
  res = '';
}

var card = [];

function displaycard(a) {
  let j = 0;
  if (card.length == 0) {
    document.getElementById;
  }
}

elCartModal.addEventListener('click', (evt) => {
  if (evt.target.matches('.delete-btn')) {
    let productId = evt.target.dataset.productId;
    const findedProduct = korzinka.findIndex(
      (product) => product.id == productId
    );
    korzinka.splice(findedProduct, 1);

    korzinkaRender(korzinka);
    // if (product.id != evt.target.id) {
    // korzinkaRender();
    // badge.innerText = korzinka.length;
    // }
  }
  // let productId = evt.target
  // count -= korzinka[ind].price;
  // korzinka.splice(ind, 1)
  // badge.textContent = korzinka.length;
  // korzinkaRender();
  // total.textContent = count.toFixed(2);
  // if (korzinka.length === 0) {
  //   modalBody.innerHTML = <img width="100%" src="./images/karzinka-empty.png" alt="">
  // }
});

// Korzinkaga tanlangan productlarni chiqazish
function korzinkaRender(korzinka) {
  // console.log(barchasi.price);
  modalBody.innerHTML = '';
  let res = '';
  if (korzinka?.length === 0) {
    modalBody.innerHTML = '<img width="100%" src="./images/karzinka-empty.png" alt="">';
  }

  let pizzaInfoArr = [];
  korzinka?.forEach((el) => {
    res += `
    <div id="productDetail" class="d-flex align-items-center justify-content-between my-2">
        <div class="d-flex align-items-center gap-4">
          <img width="70" src="${el.image}"/>
            <div>
              <h4 class="korzinkaTitle">${el.title}</h4>
              <h2 class="korzinkaTitle text-success">$${el.price}</h2>
            </div>
          </div> 
        <img data-product-id="${el.id}" class="delete-btn" width="40" src="./assets/trash-bin.png" alt="delete icon"/> 
      </div>
    `;

    pizzaInfoArr.push(el);

    localStorage.setItem('pizzaInfo', JSON.stringify(pizzaInfoArr));

    modalBody.innerHTML = res;
  });
}

// Korzinkaga qoshish
function addToBag(id) {
  if (korzinka.find((el) => el.id === barcha[id])) {
    alert('This product is already in bag!');
  } else {
    let korzinkaFilt = barcha.filter((product) => product.id === id + 1);
    // let korzinkaFilter = barcha.filter((product) = product.id === id + product.price)
    korzinka.push(...korzinkaFilt);
    korzinkaRender(korzinka);
    badge.innerText = korzinka.length;
    editProductPrice();
    // korzinka = [...korzinka, ...barcha - pitsalar.slice(id, id + 1)]
    // badge.textContent = korzinka.length;
    // korzinkaRender();
    // count += barcha - pitsalar[id].price;
    // total.textContent = count.toFixed(2);
  }
}

// function editProductPrice() {
//   fetch('http://localhost:7777/barcha-pitsalar')
//     .then((res) => res.json())
//     .then((data) => {
//       if (data) {
//         data.map((el) => (productMainPrice.innerHTML += el.price.slice(0, 2)));
//       }
//     });
// }