<template>
    <div class="home">
        <app-header @search="onSearch"></app-header>
        <app-list :stroke="stroke"></app-list>
        <app-auth></app-auth>
        <app-fab></app-fab>
        <app-basket-modal></app-basket-modal>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import List from "../components/List";
    import Fab from "../components/Fab";
    import BasketModal from "../components/BasketModal";
    import Auth from "../components/Auth";

    export default {
        name: "Home",
        data() {
            return {
                stroke: '',
                authIsShow: false,
            }
        },
        components: {
            'app-header': Header,
            'app-list': List,
            'app-fab': Fab,
            'app-basket-modal': BasketModal,
            'app-auth': Auth
        },
        methods: {
            onSearch(data) {
                this.stroke = data;
            },
            onShowAuth() {
                this.authIsShow = true
            },

        }
    }
</script>

<style scoped>

</style>