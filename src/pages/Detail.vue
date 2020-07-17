<template>
    <div>
        <div class="p-0_5 m-a d-flex flex-wrap-wrap detail">
            <div class="mt-1 mb-1 figure">
                <img :src="product.img" class="img-full">
            </div>
            <div class="flex mt-1 mb-1 ml-2 figcaption">
                <h1 class="title">{{product.name}}</h1>
                <ul class="list">
                    <li v-for="(detail, idx) in product.details" :key="idx">{{detail}}</li>
                </ul>
                <div class="d-flex price">
                    <span class="symbol">$</span> <span>{{product.price}}</span>
                </div>
                <button class="p-1 mt-1 mb-0_5 add-cart" @click="updateState(product, 1)">Add to Basket</button>
            </div>
        </div>

        <app-fab></app-fab>
        <app-basket-modal></app-basket-modal>
    </div>
</template>

<script>
    import Fab from "../components/Fab";
    import BasketModal from "../components/BasketModal";

    export default {
        name: "Detail",
        props: ['id'],
        components: {
            'app-fab': Fab,
            'app-basket-modal': BasketModal,
        },
        computed: {
            product() {
                const id = this.id
                return this.$store.getters.productById(id)
            }
        },
        methods: {
            updateState(product, quantity) {
                return this.$store.dispatch('updateState', {product, quantity: quantity})
            },
            scrollToTop() {
                return window.scrollTo(0, 0);
            }
        },
        created() {
            this.scrollToTop()
        }
    }
</script>

<style scoped>

    .detail {
        max-width: 1600px;
    }

    .figure {
        width: 35.8%;
    }

    .figcaption {
        /*width: 50%;*/
    }

    .list{
        font-size: 1.5em;
        line-height: 1.5em;
        font-weight: bold;
        list-style: none;
        padding: 0;
        margin: 1em 0;
    }

    .title, .price {
        margin: 0;
        font-size: 2em;
        font-weight: 700;
    }

    .add-cart {
        font-size: 1em;
        font-weight: bold;
        letter-spacing: 0.05em;
        border-radius: 16px;
        background: #000;
        color: #fff;
        box-shadow: 0 0 20px rgba(0, 0, 0, .1);
        cursor: pointer;
        transition: 0.1s ease 0s;
    }

    .add-cart:active {
        transform: scale(0.98);
    }

    @media (max-width: 1024px) {

        .figure, .figcaption {
            width: 100%;
            margin: 0.5em 0;
        }

        .add-cart {
            margin: 0.5em 0;
        }

    }

    @media (max-width: 767px) {

        .title, .price {
            font-size: 1.5em;
        }

        .list {
            font-size: 1.2em;
            margin: 0.75em 0;
        }

    }

    @media (max-width: 360px) {

        .title, .price {
            font-size: 1.2em;
        }

        .list {
            font-size: 1em;
        }

    }

</style>