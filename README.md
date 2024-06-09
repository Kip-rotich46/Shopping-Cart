# Shopping Cart System Documentation

This documentation provides an overview of the JavaScript code used to implement a simple shopping cart system. The system includes functionality to display products, add items to the cart, update item quantities, remove items, and calculate the total amount.

## Elements and Initial Setup

### HTML Elements
- `label`: An element to display messages, such as when the cart is empty or the total bill amount.
- `shoppingCart`: The element where cart items are displayed.
- `shop`: The element where the shop items are displayed.
- `cartAmount`: An element to display the total number of items in the cart.

### Initial Data
- `basket`: An array stored in localStorage that holds the items added to the cart.

```javascript
let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let shop = document.getElementById('shop');
let basket = JSON.parse(localStorage.getItem('data')) || [];
```

## Functions

### Calculation of Cart Item Count

Updates the cart icon with the total number of items in the cart.

```javascript
let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
```

### Generating Cart Items

Displays the items in the cart, or a message if the cart is empty.

```javascript
let generateCartItems = () => {
    if (basket.length !== 0) {
        shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
                <div class='cart-item'>
                    <img width='100' src=${img} alt=''/>
                    <div class='details'>
                        <div class='title-price-x'>
                            <h4 class='title-price'>
                                <p>${name}</p>
                                <p class='cart-item-price'>$ ${price}</p>
                            </h4>
                            <i onclick='removeItem(${id})' class='bi bi-x-lg'></i>
                        </div>
                        <div class='buttons'>
                            <i onclick='decrement(${id})' class='bi bi-dash-lg'></i>
                            <div class='quantity' id=${id}>${item}</div>
                            <i onclick='increment(${id})' class='bi bi-plus-lg'></i>
                        </div>
                        <h3>$ ${item * price}</h3>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        shoppingCart.innerHTML = '';
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href='index.html'>
                <button class='HomeBtn'>Back To Home</button>
            </a>
        `;
    }
};

generateCartItems();
```

### Increment Item Quantity

Increases the quantity of an item in the cart.

```javascript
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({ id: selectedItem.id, item: 1 });
    } else {
        search.item += 1;
    }

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem('data', JSON.stringify(basket));
};
```

### Decrement Item Quantity

Decreases the quantity of an item in the cart or removes it if the quantity is zero.

```javascript
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem('data', JSON.stringify(basket));
};
```

### Update Item Quantity

Updates the displayed quantity of an item and recalculates totals.

```javascript
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};
```

### Remove Item from Cart

Removes an item from the cart.

```javascript
let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
};
```

### Clear Cart

Clears all items from the cart.

```javascript
let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
};
```

### Calculate Total Amount

Calculates and displays the total amount for the items in the cart.

```javascript
let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);

        label.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
            <button class='checkout'>Checkout</button>
            <button onclick='clearCart()' class='removeAll'>Clear Cart</button>
        `;
    } else return;
};

totalAmount();
```

### Generate Shop Items

Displays items available in the shop.

```javascript
let generateShop = () => {
    shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
            <div class='item' id=product-id-${id}>
                <img width='220' src=${img} alt=''>
                <div class='details'>
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class='price-quantity'>
                        <h2>${price}</h2>
                        <div class='buttons'>
                            <i onclick='decrement(${id})' class='bi bi-dash-lg'></i>
                            <div class='quantity' id=${id}>${search.item === undefined ? 0 : search.item}</div>
                            <i onclick='increment(${id})' class='bi bi-plus-lg'></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

generateShop();
```

The above code handles the core functionalities of the shopping cart system, including displaying products, managing the cart's state, and updating the user interface accordingly.