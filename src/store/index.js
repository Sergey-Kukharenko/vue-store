import Vue from 'vue';
import Vuex from 'vuex';
import shared from './shared';
import products from './products';
import basket from './basket';
import user from "./user";
import favorites from "./favorites";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        shared, products, basket, user, favorites
    }
});