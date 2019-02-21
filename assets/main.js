var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        description: 'These are very nice socks! Paired with lorem ipsum text.',
        image: './media/green_on_white.jpeg',
        link: '//google.com',
        inStock: true,
        onSale: false,
        details: ["90% cotton", "30% polyester", "Gender-Bender"],
        variants: [
            {
                variantId: 1,
                variantColour: "green",
                variantImage: './media/green_on_white.jpeg'
            },
            {
                variantId: 2,
                variantColour: "blue",
                variantImage: './media/blue_on_white.jpeg'
        }],
        cart: 0,
    },
    methods: {
        addToCart() {

            this.cart += 1
        },
        updateProduct(variantImage) {

            this.image = variantImage
        },
        emptyCart() {

            if(this.cart === 0) {

                this.cart = 4358903459
            } else {

                this.cart = 0
            }
        }
    }
});

Vue.config.devtools = true;