import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export const renderPaymentSummary = () => {
    document.querySelector('.js-payment-summary')
    .innerHTML = `
        <div class="payment-summary-title"> Order Summary </div>

        <div class="payment-summary-row">
            <div>Items (${cart.length || 'No items'}):</div>
            <div class="payment-summary-money">${itemsInCartPrice()}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${shippinPrice()}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${subtotalPrice()}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${getTax()}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${getFullPrice()}</div>
        </div>

        <button class="place-order-button button-primary"> Place your order </button>
    `;
}


function getFullPrice() {
    return "$" + formatCurrency(subtotalPrice(true) + getTax(true));
}

function getTax(InCents) {
    if ( InCents ) {
        return subtotalPrice(true) * 0.1;
    }

    return "$" + formatCurrency(subtotalPrice(true) * 0.1);
}

function itemsInCartPrice(InCents) {
    let itemPrice = 0;

    cart.forEach((cartItem) => {
        products.forEach((product) => {
            if (cartItem.productId === product.id) {
                itemPrice += product.priceCents * cartItem.quantity
            }
        })
    });

    if ( InCents ) {
        return itemPrice;
    }

    return '$' + formatCurrency(itemPrice);
}

function shippinPrice(InCents) {
    let deliveryPrice = 0;
    cart.forEach((cartItem) => {
        deliveryOptions.forEach((deliveryOptions) => {
            if (cartItem.deliveryOptionId == deliveryOptions.id) {
                deliveryPrice += deliveryOptions.priceCents
            }
        })
    });

    if ( InCents ) {
        return deliveryPrice;
    }

    return '$' + formatCurrency(deliveryPrice);
}

function subtotalPrice(InCents) {
    if ( InCents ) {
        return shippinPrice(true) + itemsInCartPrice(true);
    }

    return '$' + formatCurrency(shippinPrice(true) + itemsInCartPrice(true));
}