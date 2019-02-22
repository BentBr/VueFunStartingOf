var eventBus = new Vue();

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

            <product-tabs :reviews="reviews"></product-tabs>

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
            reviews: []
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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
});

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
               <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
        </p>
    
        <p>
            <label for="name">Name:</label>    
            <input id="name" v-model="name">
        </p>
        
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        
        <p>
            <label>
                Yes
                <input type="radio" value="true" v-model.boolean="recommend" />
            </label>
            <label>
                No
                <input type="radio" value="false" v-model.boolean="recommend" />
            </label>
        </p>
        
        <p>
            <input type="submit" value="Submit">
        </p>
        
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommend) this.errors.push("Recommendation required.")
            }


        }
    }
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
            :class="{ activeTab: selectedTab ===tab }"
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = tab">
            {{ tab }}</span>
            
            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name}}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        <p>{{ review.recommend }}</p>
                    </li>
                </ul>
            </div>
            
            <product-review v-show="selectedTab === 'Make a Review'"
             ></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
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