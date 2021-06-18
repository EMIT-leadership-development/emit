// SNIPCART FUNCTIONS
document.addEventListener('snipcart.ready', () => {
    Snipcart.DEBUG = true;
    // 1. Listen for Currency Selection Action and change currency in snipcart and on page
    changeCartCurrency();
    // 2. Check for items in cart and give feedback on page about what's in cart
    displayCartFeedback();
    // 3. When payment is processed clear all forms
    resetForms();
    // 4. Change payment form style
    paymentFormStyle();
});

// ---1. LISTEN FOR SELECT CURRENCY OPTION IN MODAL
function changeCartCurrency() {
    let radioVal;
    const radios = document.querySelectorAll('input[name="currency"]');
    radios.forEach(radio => {
        radio.addEventListener('click', function () {
            radioVal = radio.value;
            Snipcart.api.session.setCurrency(radioVal);
        });
    });
    Snipcart.store.subscribe(updateCurrencyDisplay);
}
// --2. LISTEN FOR CHANGES TO CART AND DISPLAY FEEDBACK
function displayCartFeedback() {
    Snipcart.store.subscribe(() => {
        // In-cart Feedback for products
        const count = Snipcart.store.getState().cart.items.count;
        const cartItems = Snipcart.store.getState().cart.items.items;
        let cartItemsIDs = [];
        cartItems.forEach(cartItem => {
            cartItemsIDs += cartItem.id;
        });
        // If there are any items in cart show feedback on page
        if (count >= 1) {
            addRemoveInCartClass(cartItemsIDs);
        } else {
        // No items in cart remove all product feedback on page
            resetProducts();
        }
    });
}
// --3. RESET FORMS WHEN SNIPCART IS RESET (PAYMENT PROCESSED?)
function resetForms() {
    Snipcart.events.on('cart.confirmed', (cartConfirmResponse) => {
        var forms = document.getElementsByClassName("materialForm");
        console.log(forms);
        forms.forEach(form => {
            form.reset();
        });
    });
}
// --4. PAYMENT FORM STYLING
function paymentFormStyle() {
    Snipcart.api.theme.customization.registerPaymentFormCustomization({
        input: {
            color: '#ffffff',
            placeholder: {
                color: '#ffffff',
            },
        },
        label: {
            color: '#fff'
        }
    });
}

// ------------------------------------------------------------------
// CUSTOM CONTRIBUTION BUTTON WITH SPECIAL VALIDATION URL
function updateCustomDonation() {
    const customValidationItems = document.querySelectorAll('.customValidation');
    customValidationItems.forEach(item => {
        const button = item.querySelector('.submitCustomDonation');
        const productID = item.id;
        const transactionAmount = item.querySelector('.transaction-amt');
        const subscription = item.querySelector('.subscriptionCheckbox');
        const message = item.querySelector('.message')
        transactionAmount.addEventListener('change', () => {
            // Sets the default amount when adding the item
            button.setAttribute('data-item-price', transactionAmount.value);
            button.setAttribute(
                'data-item-url', 'https://emit-portal.netlify.app/donate/validate/' + productID
                + '?amount=' + transactionAmount.value
                + '&subscription=' + subscription.checked);
        })
        subscription.addEventListener('change', () => {
            // Sets the default amount when adding the item
            button.setAttribute('data-item-price', transactionAmount.value);
            button.setAttribute(
                'data-item-url', 'https://emit-portal.netlify.app/donate/validate/' + productID
                + '?amount=' + transactionAmount.value
                + '&subscription=' + subscription.checked);
            if (subscription.checked == true) {
                button.setAttribute('data-plan1-id', 'monthly-' + productID );
                button.setAttribute('data-plan1-name', 'Monthly ' + productID);
                button.setAttribute('data-plan1-frequency', 'Monthly');
                button.setAttribute('data-plan1-interval', '1');
                button.setAttribute('data-item-selected-plan', 'monthly-' + productID);
            } else {
                button.removeAttribute('data-foo')
                button.removeAttribute('data-plan1-id');
                button.removeAttribute('data-plan1-name');
                button.removeAttribute('data-plan1-frequency');
                button.removeAttribute('data-plan1-interval');
                button.removeAttribute('data-item-selected-plan');
            }
        })
        message.addEventListener('change', () => {
            // Sets the message when adding the item
            button.setAttribute("data-item-custom1-value", message.value);
        })
    });
}
updateCustomDonation();



// ---Change on-page currency display (products and top-nav icon)
function updateCurrencyDisplay() {
    const state = Snipcart.store.getState();
    const currency = state.cart.currency;
    const prices = document.getElementsByClassName("productCurrency");
    const currencyBtns = document.getElementsByClassName("currencyBtn");

    prices.forEach(price => {
        if (price.classList.contains('activePrice')) {
            price.classList.remove("activePrice");
        }
        if (price.classList.contains(currency)) {
            price.classList.add("activePrice");
        }
    });
    currencyBtns.forEach(button => {
        if (button.classList.contains('activePrice')) {
            button.classList.remove("activePrice");
        }
        if (button.classList.contains(currency)) {
            button.classList.add("activePrice");
        }
    });
}
// Check it product is in cart and show-hide the feedback
function addRemoveInCartClass(cartItemsIDs) {
    let products = document.getElementsByClassName('product');
    console.log(cartItemsIDs);
    products.forEach(product => {
        if (cartItemsIDs.indexOf(product.id) > -1) {
            product.classList.add("inCart");
        } else {
            product.classList.remove("inCart");
        }
    });
}
// ---Reset (Remove) in-cart feedback for all products
function resetProducts() {
    let products = document.getElementsByClassName('product');
    products.forEach(product => {
        product.classList.remove("inCart");
    });
}