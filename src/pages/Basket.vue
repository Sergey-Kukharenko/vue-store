<template>
    <div class="d-flex justify-content-space-between basket" v-if="loading">
        <div class="d-flex flex-wrap-wrap align-items-stretch list">
            <div
                    class="d-flex align-items-stretch justify-content-space-between p-1 m-0_35 item"
                    v-for="(item, index) in basket"
                    :key="index"
            >
                <div class="d-flex group">
                    <div class="flex-shrink-none relative-parent figure">
                        <img :src="item.img" class="absolute-center img-contain" :alt="item.name">
                    </div>
                    <div class="flex ml-1 mr-1 d-flex align-items-center figcaption">
                        <div class="d-flex flex-direction-column justify-content-center group-text">
                            <div class="text-bold name">
                                {{ item.name}}
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
        <div class="sidebar m-0_35">
            <div class="full-height sidebar-wrap">
                <div class="p-1 d-flex flex-direction-column justify-content-space-between sidebar-container">
                    <div class="d-flex align-items-center justify-content-space-between">
                        <h2 class="title">Total</h2>
                        <h2 class="d-flex align-items-center title"><span>$</span> <span>{{sumPrices}}</span></h2>
                    </div>
                    <div class="p-1 mt-1 text-bold pay" @click="result">pay</div>
                </div>
            </div>
        </div>
    </div>
    <Loading v-else/>
</template>

<script>
    import Loading from "../components/Loading";

    export default {
        name: "Basket",
        components: {Loading},
        computed: {
            basket() {
                return this.$store.getters.basket
            },
            sumPrices() {
                return this.$store.getters.sumPrices
            }
        },
        methods: {
            updateState(product, quantity) {
                return this.$store.dispatch('updateState', {product, quantity: quantity}).then(() => {
                    if (!this.basketLength()) {
                        this.$router.push('/');
                    }

                }).catch(() => {
                })
            },
            getBasket() {
                return this.$store.getters.basket
            },
            basketLength() {
                return this.$store.getters.basketLength
            },
            result() {
                // alert(JSON.stringify(this.getBasket(), null, 4));
                return this.$store.dispatch('sendOrder').then(() => {
                    this.$router.push('/');
                }).catch(() => {
                })
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        beforeMount() {
            if (this.basketLength() === 0) {
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

    .sidebar {
        width: 25%;
        max-height: calc(100vh - 1.25em);
        position: -webkit-sticky;
        position: sticky;
        top: 0.5em;
        z-index: 2;
        box-sizing: border-box;
    }

    .sidebar-wrap{
        position: relative;
    }

    .sidebar-container {
        position: relative;
        z-index: 2;
        height: 100%;
        background: #fff;
        box-shadow: 0 0px 6px 0 rgba(32, 33, 36, 0.28);
        border-radius: 24px;
        box-sizing: border-box;
    }

    .title {
        margin: 0;
        font-size: 1.25em;
        font-weight: 700;
    }

    .pay {
        text-align: center;
        border-radius: 24px;
        text-transform: uppercase;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        box-shadow: 0 0px 6px 0 rgba(111, 111, 111, 0.31);
        transition: box-shadow 0.3s ease 0s, transform 0.3s ease 0s;
    }

    .pay:hover {
        box-shadow: 0 0px 10px 0 rgba(111, 111, 111, 0.31);
    }

    .pay:active {
        transform: scale(0.94);
    }

</style>

<style scoped>

    .list {
        width: 75%;
    }

    .item {
        flex: 1 1 calc(50% - 1em);
        position: relative;
        z-index: 2;
        border-radius: 12px;
        box-shadow: 0 0px 6px 0 rgba(32, 33, 36, 0.28);
        /* background: #fff; */
        background: #fff;
        border-radius: 24px;
        box-sizing: border-box;
        transition: box-shadow 0.3s ease 0s;
    }

    .item:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
    }

    .group {
        width: 100%;
    }

    .figure {
        width: 20%;
        padding-bottom: 20%;
    }

    .group-text {
        height: 100%;
    }

    .text-bold {
        font-family: 'Gotham SSm A', 'Gotham SSm B', 'Inter', system-ui, 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Arial, sans-serif;
        font-size: 1em;
        font-weight: 700;
    }

    .price {
        font-size: 1.25em;
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
        font-size: 0.75em;
    }

    @media (min-width: 1025px) {

        .item {
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(20px);
        }

    }

    @media (max-width: 1340px) {

        .list{
            flex-wrap: wrap;
        }

        .item {
            flex: 1 1 calc(100% - 1em);
        }

    }

    @media (max-width: 768px) {

        .basket {
            flex-wrap: wrap;
            flex-direction: column;
            min-height: calc(100vh - 0.7em);
        }

        .list, .sidebar {
            width: 100%;
        }

        .sidebar {
            width: 100%;
            top: inherit;
            bottom: 0.5em;
            margin: 0.35em 0 0 0;
        }

        .sidebar-wrap:after{
            content: '';
            display: block;
            position: absolute;
            top: -1em;
            left: -0.35em;
            right: -0.35em;
            bottom: -0.5em;
            z-index: 1;
            margin: auto;
            background: linear-gradient(to bottom, #ffffff94, #9a9a9a2b);
            border-radius: 24px 24px 0 0;
        }

    }

    @media (max-width: 650px) {

        .basket {
            width: 100%;
            left: 0;
            bottom: 21px;
        }

        .basket-background {
            border-radius: 16px 16px 0 0px;
        }

        .item {
            flex: 1 1 100%;
            margin: 0.5em 0;
        }

    }

    @media (max-width: 440px) {

        .figure {
            width: 23.4%;
        }

    }


</style>