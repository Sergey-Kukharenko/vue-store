import Vue from 'vue';
import Router from 'vue-router';
import Home from "../pages/Home";
import Detail from "../pages/Detail";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/:id',
            props: true,
            name: 'detail',
            component: Detail
        },

    ],
    mode: 'history'
});