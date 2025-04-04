export function setupWooAddToCart() {
    document.addEventListener("DOMContentLoaded", function (event) {
        var quantityDecrease = document.querySelector('.quantity-decrease');
        var quantityIncrease = document.querySelector('.quantity-increase');
        var quantityInput = document.querySelector('.quantity-input');
        if (quantityDecrease != null) {
            quantityDecrease.addEventListener('click', function (event) {
                var blockId = quantityDecrease.parentElement.getAttribute("data-blockid")
                var quantityInputX = document.querySelector('.' + blockId + ' input');
                var quantity = parseInt(quantityInputX.value) - 1
                updateQuantity(blockId, quantity);
            })
        }
        if (quantityIncrease != null) {
            quantityIncrease.addEventListener('click', function (event) {
                var blockId = quantityIncrease.parentElement.getAttribute("data-blockid")
                var quantityInputX = document.querySelector('.' + blockId + ' input');
                var quantity = parseInt(quantityInputX.value) + 1
                updateQuantity(blockId, quantity);
            })
        }
        if (quantityInput != null) {
            quantityInput.addEventListener('keyup', function (event) {
                var val = event.target.value;
                var blockId = quantityInput.parentElement.getAttribute("data-blockid")
                updateQuantity(blockId, val);
            })
        }
        function updateQuantity(blockId, quantity) {
            var cartBtn = document.querySelector('.' + blockId + ' .cartBtn');
            var quantityInputX = document.querySelector('.' + blockId + ' input');
            if (quantity != 0) {
                quantityInputX.value = quantity;
                cartBtn.setAttribute('data-quantity', quantity)
            }
        }
    });
}