<template>
    <div>
        <div class="d-flex flex-wrap-wrap align-items-stretch list" v-if="loading">
            <div
                    class="d-flex flex-direction-column item p-1 m-0_35"
                    v-for="product in multipleFilter"
                    :key="product.id"
            >
                <div
                        class="p-1 m--1 like"
                        :class="{active: product.favorite}"
                        @click="toggleLike(product), updateFavorites(product)"
                >
                    <i class="fa fa-heart like-icon"></i>
                </div>
                <router-link
                        class="relative-parent mt-1_25 figure"
                        :to="'/products/'+ product.id"
                        exact
                >
                    <img :src="product.img" class="absolute-center img-contain">
                </router-link>
                <div class="flex d-flex flex-direction-column">
                    <router-link
                            class="flex mt-1_5 name"
                            :to="'/products/'+ product.id"
                            exact
                    >
                        {{product.name | truncate(100, ' ...')}}
                    </router-link>
                    <div class="d-flex align-items-center justify-content-space-between mt-1">
                        <div class="d-flex price">
                            <span class="symbol">$</span> <span>{{product.price}}</span>
                        </div>
                        <div
                                class="p-0_75 m--0_75 add-cart"
                                @click="updateState(product, 1)"
                        >
                            <i class="fas fa-cart-plus" style="font-size: 17px;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-else/>
    </div>
</template>

<script>
    import Loading from "./Loading";
    import {compose} from "../utils";

    export default {
        name: "List",
        props: ['stroke', 'setFilter'],
        components: {Loading},
        computed: {
            products() {
                return this.$store.getters.products
            },
            multipleFilter() {
                const arr = this.products

                const favorite = (arr, key) => arr.filter(item => item[key])
                const min = (arr, obj, key) => arr.sort((a, b) => a[obj[key]] - b[obj[key]])
                const max = (arr, obj, key) => arr.sort((a, b) => b[obj[key]] - a[obj[key]])

                const multipleSearch = stroke => array => array.filter(obj => Object.values(obj).some(val => val?val.toString().toLowerCase().includes(stroke.toLowerCase()):false))
                const setFilter = obj => arr => {

                    switch (obj.type) {
                        case 'min':
                            return min(arr, obj, 'name')

                        case 'max':
                            return max(arr, obj, 'name')

                        case 'favorite':
                            return favorite(arr, 'favorite')

                        case 'all':
                            return arr

                        default:
                            return arr;
                    }
                }

                return compose(
                    setFilter(this.setFilter),
                    multipleSearch(this.stroke)
                )(arr)

            }
        },
        filters: {
            truncate: (text, length, suffix) => text.substring(0, length) + suffix
        },
        methods: {
            toggleLike(product) {
                return product.favorite = !product.favorite
            },
            favorite(arr) {
                return arr.filter(item => {
                    return item.favorite
                })
            },
            min(arr, obj, key) {
                return arr.sort((a, b) => a[obj[key]] - b[obj[key]])
            },
            max(arr, obj, key) {
                return arr.sort((a, b) => b[obj[key]] - a[obj[key]])
            },
            updateState(product, quantity) {
                return this.$store.dispatch('updateState', {product, quantity: quantity})
            },
            updateFavorites(payload) {
                return this.$store.dispatch('updateFavorites', payload)
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

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

    .like {
        position: absolute;
        z-index: 2;
        cursor: pointer;
    }

    .like-icon {
        color: #c7c7c7;
        transition: 0.3s ease 0s;
    }

    .like:hover .like-icon{
        color: #828282;
    }

    .like.active .like-icon {
        color: #000;
    }

    .figure {
        width: 100%;
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
        color: #000;
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