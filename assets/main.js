Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="product">

            <div class="product-image">
                <img :src="image">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>

                <p>{{ description }}</p>

                <a v-show="" :href="link" target="_blank">Some nice Link</a>

                <p v-if="inStock">In Stock</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <p>{{ sale }}</p>
                <p>Shipping: {{ shipping }}</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div v-for="(variant, index) in variants"
                        :key="variant.variantId"
                        class="color-box"
                        :style="{ backgroundColor: variant.variantColour }"
                        @mouseover="updateProduct(index)">

                </div>

                <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add 1 to Cart</button>
                <button @click="removeFromCart">Remove from Cart</button>


            </div>


        </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue',
            description: 'These are very nice socks! Paired with lorem ipsum text.',
            link: '//google.com',
            selectedVariant: 0,
            onSale: false,
            variants: [
                {
                    variantId: 1,
                    variantColour: "green",
                    variantImage: './media/green_on_white.jpeg',
                    variantQuantity: 10
                },
                {
                    variantId: 2,
                    variantColour: "blue",
                    variantImage: './media/blue_on_white.jpeg',
                    variantQuantity: 5
                }],
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if(this.onSale) {
                return this.title + ' are on Sale!'
            }

        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    },

    methods: {
        addToCart() {

            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {

            this.selectedVariant = index
        },
        removeFromCart() {

            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        details: ['90% cotton', '30% polyester', 'Gender-Bender'],
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
});

Vue.config.devtools = true;