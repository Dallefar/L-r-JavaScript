import { cart, removeFromCart, updateDelivery, updateCartQuantityWithInput } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export const renderOrderSummary = () => {
    let htmlString = '';
    document.querySelector('.return-to-home-link').innerHTML = (cart.length == 0) ? 'No Items' : cart.length + ' items';
    document.title = (cart.length === 0) ? 'Checkout' : 'Checkout - (' + cart.length + ' items)';

    cart.forEach((cartItem, index) => {
        const productId = cartItem.productId;
        let productData;
        
        products.forEach(( product ) => {
            if (productId === product.id) {
                productData = product;
            }
        })

        htmlString += `
            <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date">
                    ${deliveryTitle(cartItem.deliveryOptionId)}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${productData.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${productData.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(productData.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span> Quantity: <input type="number" name="" id="" value="${cartItem.quantity}" data-product-id="${cartItem.productId}" class="js-update-quantity-link" style="display: inline; width: 60px;"> </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${cartItem.productId}"> Delete </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title"> Choose a delivery option: </div>
                        ${deliveryOptionsHtml(productData, cartItem.deliveryOptionId)}
                    </div>
                </div>
                </div>
            `;
    });

    function deliveryTitle(id) {
        let deliveryString = '';

        deliveryOptions.forEach((deliveryOption) => {
            if (deliveryOption.id == id) {
                deliveryString = dayjs().add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM M');
            }
        })

        return 'Delivery date: ' + deliveryString;
    }

    function deliveryOptionsHtml(productData, id) {
        let htmlString = '';
        deliveryOptions.forEach((deliveryOption) => {
            const deliveryString = ( deliveryOption.priceCents === 0 ) ? 'FREE SHIPPING' : formatCurrency(deliveryOption.priceCents) + ' - Shipping';

            htmlString += `
                <div class="delivery-option js-delivery-option" data-delivery-id="${deliveryOption.id}" data-product-id="${productData.id}">
                    <input type="radio"
                        ${(deliveryOption.id == id) ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${productData.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dayjs().add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM M')}
                    </div>
                    <div class="delivery-option-price">
                        ${deliveryString} 
                    </div>
                    </div>
                </div>
            `
        })

        return htmlString; 
    }

    document.querySelector('.order-summary'). innerHTML = htmlString;

    document.querySelectorAll('.js-delete-quantity-link').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            removeFromCart(productId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {deliveryId, productId} = element.dataset;
            console.log(deliveryId, productId)
            updateDelivery(productId, deliveryId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    })

    document.querySelectorAll('.js-update-quantity-link').forEach((input) => {
        input.addEventListener('input', () => {
            updateCartQuantityWithInput(input.dataset.productId, input.value);
            renderPaymentSummary();
        })

        input.addEventListener('blur', () => {
            if (Number(input.value) <=  0) {
                removeFromCart(input.dataset.productId);
                renderOrderSummary();
            }
        })
    })
}