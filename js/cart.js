// CUSTOM DONATION FORM
function updateCustomDonation() {
    const button = document.querySelector('#submitCustomDonation');
    const transactionAmount = document.querySelector('#transaction-amt');
    transactionAmount.addEventListener('change', () => {
        // Sets the default amount when adding the item
        button.setAttribute('data-item-price', transactionAmount.value);
        button.setAttribute('data-item-url', 'https://emit-portal.netlify.app/donate/custom-contribution/' + transactionAmount.value);
    })
    const message = document.querySelector('#message')
    message.addEventListener('change', () => {
        // Sets the message when adding the item
        button.setAttribute("data-item-custom1-value", message.value);
    })

}
updateCustomDonation();



// SNIPCART FUNCTIONS
document.addEventListener('snipcart.ready', () => {
    Snipcart.DEBUG = true;
    // 1. Listen for Currency Selection Action and change currency in snipcart and on page
    changeCartCurrency();
    // 2. Check for items in cart and give feedback on page about what's in cart
    displayCartFeedback();
    // 3. When Item is removed from cart
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
// --2. LISTEN FOR CHANGES TO CART
function displayCartFeedback() {
    Snipcart.store.subscribe(() => {
        // In-cart Feedback for products
        const count = Snipcart.store.getState().cart.items.count;
        const cartItems = Snipcart.store.getState().cart.items.items;
        let cartItemsIDs = [];
        cartItems.forEach(cartItem => {
            cartItemsIDs += cartItem.id;
        });
        // If there are any items in cart
        if (count >= 1) {
            addRemoveInCartClass(cartItemsIDs);
        } else {
        // No items in cart remove all product feedback from cart
            resetProducts();
        }
    });
}
// ------------------------------------------------------------------
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