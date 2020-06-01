<template>
    <div class="d-flex flex-wrap-wrap align-items-stretch list">
        <div
                class="d-flex flex-direction-column item p-1 m-0_35"
                v-for="product in products"
                :key="product.id"
        >
            <div class="relative-parent figure">
                <img :src="product.img" class="absolute-center img-contain">
            </div>
            <div class="flex d-flex flex-direction-column">
                <div class="flex mt-1_5 name">{{product.name}}</div>
                <div class="d-flex align-items-center justify-content-space-between mt-1">
                    <div class="d-flex price">
                        <span class="symbol">$</span> <span>{{product.price}}</span>
                    </div>
                    <div
                            class="p-0_75 m--0_75 add-cart"
                            @click="updateState(product, 1)"
                    >
                        <!--                        <img src="../../public/img/icons/add-cart.svg" class="img-full">-->
                        <i class="fas fa-cart-plus" style="font-size: 17px;"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        computed: {
            products() {
                return this.$store.getters.products
            },
        },
        methods: {
            updateState(product, quantity) {
                return this.$store.dispatch('updateState', {product, quantity: quantity})
            }
        }
    }
</script>

<style scoped>

    .list {
        margin: -0.35em;
    }

    .item {
        width: calc(25% - 0.7em);
        border-radius: 16px;
        box-shadow: 0 0 20px rgba(0, 0, 0, .1);
        box-sizing: border-box;
        transition: box-shadow 0.3s ease 0s;
    }

    .item:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
    }

    .figure {
        width: 100%;
        margin: 0 auto;
        border-radius: 16px;
        padding-bottom: 82%;
    }

    .figure:hover {
        animation: wiggle 2.7s infinite;
    }

    .name {
        font-family: 'Gotham SSm A', 'Gotham SSm B', 'Inter', system-ui, 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Arial, sans-serif;
        font-size: 1em;
        font-weight: 600;
        line-height: 1.15em;
    }

    .price {
        font-family: 'Gotham SSm A', 'Gotham SSm B', 'Inter', system-ui, 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Arial, sans-serif;
        font-size: 1.25em;
        font-weight: 700;
    }

    .add-cart {
        width: 20px;
        border-radius: 50%;
        cursor: pointer;
    }

    @media (max-width: 991px) {

        .item {
            width: calc(33.333% - 0.7em);
        }

    }

    @media (max-width: 768px) {

        .item {
            width: calc(50% - 0.7em);
        }

    }

    @media (max-width: 500px) {

        .item {
            width: calc(100% - 0.7em);
        }

    }


</style>