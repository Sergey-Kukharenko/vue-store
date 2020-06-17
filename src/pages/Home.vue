<template>
    <div class="home">
        <app-header @search="onSearch" @setFilter="onSetFilter"></app-header>
        <app-list :stroke="stroke" :setFilter="setFilter"></app-list>
        <app-auth></app-auth>
        <app-fab></app-fab>
        <app-basket-modal></app-basket-modal>
        <app-snackbar></app-snackbar>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import List from "../components/List";
    import Fab from "../components/Fab";
    import BasketModal from "../components/BasketModal";
    import Auth from "../components/Auth";
    import Snackbar from "../components/Snackbar";

    export default {
        name: "Home",
        data() {
            return {
                stroke: '',
                setFilter: '',
                authIsShow: false,
                message: 'This is'
            }
        },
        components: {
            'app-header': Header,
            'app-list': List,
            'app-fab': Fab,
            'app-basket-modal': BasketModal,
            'app-auth': Auth,
            'app-snackbar': Snackbar
        },
        methods: {
            onSearch(data) {
                this.stroke = data;
            },
            onSetFilter(data) {
                this.setFilter = data
            },
            onShowAuth() {
                this.authIsShow = true
            }

        }
    }
</script>

<style scoped>

</style>