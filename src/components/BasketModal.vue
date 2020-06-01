<template>
    <div class="basket">
        <div
                class="d-flex align-items-stretch justify-content-space-between p-1 mt-1 mb-1 item"
                v-for="(item, index) in basket"
                :key="index"
        >
            <div class="d-flex group">
                <div class="flex-shrink-none relative-parent figure">
                    <img :src="item.img" class="absolute-center img-contain" alt="1">
                </div>
                <div class="flex ml-1 mr-1 d-flex align-items-center figcaption">
                    <div>
                        <div class="name">
                            {{ item.name | truncate(50, ' ...') }}
                        </div>
                        <div class="d-flex mt-0_3 price"><span class="symbol">$</span> <span>{{item.price}}</span></div>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center controls">
                <div>
                    <div class="table-center p-0_35 button" @click="updateState(item, 1)">
                        <i class="fa fa-plus cell-center icon"></i>
                    </div>
                    <div class="count">{{item.quantity}}</div>
                    <div class="table-center p-0_35 button" @click="updateState(item, -1)">
                        <i class="fa fa-minus cell-center icon"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BasketModal",
        computed: {
            basket() {
                return this.$store.getters.basket
            }
        },
        filters: {
            truncate: (text, length, suffix) => text.substring(0, length) + suffix
        },
        methods: {
            updateState(product, quantity) {
                return this.$store.dispatch('updateState', {product, quantity: quantity})
            }
        }
    }
</script>

<style scoped>

    .basket {
        width: 50%;
        position: fixed;
        left: 8px;
        bottom: 8px;
        margin: auto;
        z-index: 2;
        box-sizing: border-box;
    }

    .item {
        box-shadow: 0 0px 6px 0 rgba(32, 33, 36, 0.28);
        border-radius: 24px;
        background: #fff;
        transition: box-shadow 0.3s ease 0s;
    }

    .item:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
    }

    .group {
        width: 100%;
    }

    .figure {
        width: 16%;
        padding-bottom: 16%;
    }

    .figcaption {

    }

    .name {
        font-family: 'Gotham SSm A', 'Gotham SSm B', 'Inter', system-ui, 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Arial, sans-serif;
        font-size: 1em;
        font-weight: 700;
        line-height: 1.15em;
    }

    .price, .count {
        font-family: 'Gotham SSm A', 'Gotham SSm B', 'Inter', system-ui, 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Arial, sans-serif;
        font-size: 1em;
        font-weight: 700;
    }

    .count {
        text-align: center;
        margin: 1px 0 3px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }

    .button {
        cursor: pointer;
        padding: 0.4em 0.4em;
    }

    .icon {
        font-size: 10px;
    }


</style>