export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export const addToCart = (productId) => {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem ? matchingItem.quantity++ : cart.push({ productId: productId, quantity: 1, deliveryOptionId: 1 });
}


export const updateCartQuantity = () => {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = (cart.length === 0) ? "" : cart.length ;
    saveToStorage();
}


export const removeFromCart = (productId) => {
    const newCart = [];

    cart.forEach((cartItem) => {
        if ( productId !== cartItem.productId ) {
            newCart.push(cartItem);
        } 
    })

    cart = newCart;
    saveToStorage();
}


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const updateDelivery = (productId, deliveryOptionsId) => {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionsId;
    saveToStorage();
}

export const updateCartQuantityWithInput = (productId, inputValue) => {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = inputValue;
            console.log('Quantity: '+ cartItem.quantity);
        }
    });

    saveToStorage();
}