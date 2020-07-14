import Vue from 'vue';
import Router from 'vue-router';
import Detail from "../pages/Detail";
import Basket from "../pages/Basket";
import Home from "../pages/Home";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/products/:id',
            props: true,
            name: 'detail',
            component: Detail
        },
        {
            path: '/basket',
            name: 'basket',
            component: Basket,
        },
        {path: "*", redirect: '/'}
    ],
    mode: 'history'
});