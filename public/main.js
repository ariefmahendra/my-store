document.addEventListener('DOMContentLoaded', function() {
    getListProduct();
});

/**
 * fetch list product from API and render to HTML
 * @function getListProduct
 */

function getListProduct() {
    fetch('http://localhost:8083/api/products')
        .then(res => res.json())
        .then(result => {
            renderData(result.data)
        })
        .catch(err => console.log(err))
}

function renderData(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('card', 'column');
        itemDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Price: ${item.price}</p>
                <p class="card-text-description">Description: ${item.description}</p>
                <div class="container-btn-card">
                    <button class="btn" onclick="fetchProductById('${item.id}')">Lihat</button>
                </div>
            </div>
        `;
        contentDiv.appendChild(itemDiv);
    });
}

/**
 * fetch product by id from API and render to HTML
 * @function fetchProductById
 * @param {string} id 
 */

function fetchProductById(id) {
    fetch(`http://localhost:8083/api/products/${id}`)
        .then(res => res.json())
        .then(result => {
            renderProductById(result.data)
        })
        .catch(err => console.log(err))
}

function renderProductById(product) {

    const popupElement = document.getElementById('popup');

    const background = document.createElement('div');
    background.classList.add('popup-background');

    const popup = document.createElement('div');
    popup.classList.add('card-body-popup-show');
    popup.innerHTML = `
        <div class="card">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Price: ${product.price}</p>
            <p class="card-text">Description: ${product.description}</p>
            <p class="card-text">Quantity: ${product.quantity}</p>
            <div class="container-btn-card">
                <button class="btn" onClick="fetchProductUpdateById('${product.id}')">Update</button>
                <button class="btn" onclick="deleteItem('${product.id}')">Hapus</button>
                <button class="btn" onclick="closePopup()">Close</button>
            </div>
        </div>
    `;

    popupElement.appendChild(popup);
    popupElement.appendChild(background);
}


function closePopup() {
    const popupElement = document.getElementById('popup');
    popupElement.innerHTML = '';
    popupElement.classList.remove('card-body-popup-show');
}

/**
 * Delete product by id from API
 * @param {string} id 
 */

function deleteItem(id) {
    fetch(`http://localhost:8083/api/products/${id}`, {
        method: 'DELETE',
    }).then(() => {
        closePopup()
        getListProduct()
    }).catch(err => console.log(err))
}

/**
 * Todo: fetch product update by id
 * @param {*} id 
 */
function fetchProductUpdateById(id){
    fetch(`http://localhost:8083/api/products/${id}`)
        .then(res => res.json())
        .then(result => {
            renderUpdateProductForm(result.data)
        }).catch(err => console.log(err))
}

function renderUpdateProductForm(product) {
    closePopup();

    document.querySelector('#id').value = product.id;
    document.querySelector('#name').value = product.name;
    document.querySelector('#price').value = product.price;
    document.querySelector('#description').value = product.description;
    document.querySelector('#quantity').value = product.quantity;

    const form = document.getElementById('popup-form')
    form.style.display = 'flex';
    const popup = document.getElementById('popup')
    const background = document.createElement('div');
    background.classList.add('popup-background');
    
    popup.appendChild(background);
}


function updateItem() {
    const product = {
        id:  document.querySelector('#id').value,
        name: document.querySelector('#name').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        quantity: document.querySelector('#quantity').value
    }

    fetch(`http://localhost:8083/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function closeButtonForm(){
    const form = document.getElementById('popup-form')
    form.style.display = 'none'
    const background = document.getElementsByClassName('popup-background')[0]
    background.remove()
}
function closeButtonFormNewProduct(){
    const form = document.getElementById('form-add-product')
    form.style.display = 'none'
    const background = document.getElementsByClassName('popup-background')[0]
    background.remove()
}

function renderCreateNewProductForm(){
    const form = document.getElementById('form-add-product')

    form.style.display = 'flex';

    const popup = document.getElementById('popup')
    const background = document.createElement('div');

    background.classList.add('popup-background');
    popup.appendChild(background);
}

function postNewProduct(){
    const product = {
        name: document.querySelector('#name-new-product').value,
        price: document.querySelector('#price-new-product').value,
        description: document.querySelector('#description-new-product').value,
        quantity: document.querySelector('#quantity-new-product').value
    }

    fetch(`http://localhost:8083/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })
        .then(() => {
            renderData()
        })
        .catch(error => {
            alert(error)
        });
}