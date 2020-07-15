<template>
    <div class="basket" :class="{active: show}">
        <div class="basket-background"></div>
        <div
                class="d-flex align-items-stretch justify-content-space-between p-1 mt-0_5 mb-0_5 item"
                v-for="(item, index) in basket"
                :key="index"
        >
            <div class="d-flex group">
                <div class="flex-shrink-none relative-parent figure">
                    <img :src="item.img" class="absolute-center img-contain" alt="1">
                </div>
                <div class="flex ml-1 mr-1 d-flex align-items-center figcaption">
                    <div>
                        <div class="text-bold name">
                            {{ item.name | truncate(70, ' ...') }}
                        </div>
                        <div class="d-flex mt-0_3 text-bold price"><span class="symbol">$</span>
                            <span>{{item.price}}</span></div>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center controls">
                <div>
                    <div class="table-center p-0_35 button" @click="updateState(item, 1)">
                        <i class="fa fa-plus cell-center icon"></i>
                    </div>
                    <div class="text-bold count">{{item.quantity}}</div>
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
        data() {
            return {
                show: false,
                timer: null
            }
        },
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
        },
        watch: {
            basket: function () {
                this.show = true
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.show = false
                }, 3000)
            }
        },
    }
</script>

<style scoped>

    .basket {
        width: 400px;
        display: none;
        position: fixed;
        right: 10px;
        bottom: 18px;
        margin: auto;
        z-index: 1;
        box-sizing: border-box;
        padding: 0 8px;
    }

    .basket.active {
        display: block;
    }

    .basket-background {
        display: none;
        width: 100%;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
    }

    .item {
        position: relative;
        z-index: 2;
        border-radius: 12px;
        box-shadow: 0 0px 6px 0 rgba(32, 33, 36, 0.28);
        border-radius: 24px;
        background: #fff;
        transition: box-shadow 0.3s ease 0s;
    }

    .group {
        width: 100%;
    }

    .figure {
        width: 17.4%;
        padding-bottom: 17.4%;
    }

    .text-bold {
        font-family: 'Gotham SSm A', 'Gotham SSm B', 'Inter', system-ui, 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Arial, sans-serif;
        font-size: 0.9em;
        font-weight: 700;
    }

    .name {
        line-height: 1.15em;
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

    @media (min-width: 1025px) {

        .fab:hover + .basket, .basket:hover{
            display: block;
        }

        .item:hover {
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
        }

        .basket-background {
            background: rgba(255, 255, 255, 0.07);
            backdrop-filter: saturate(180%) blur(20px);
        }

        .item {
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(20px);
        }

    }

    @media (max-width: 650px) {

        .basket {
            width: 100%;
            left: 0;
            bottom: 21px;
            padding: 8px 8px 0;
        }

        .basket-background {
            border-radius: 16px 16px 0 0px;
        }

        .item {
            margin: 0.5em 0;
        }

    }

    @media (max-width: 440px) {

        .figure {
            width: 23.4%;
        }

    }


</style>