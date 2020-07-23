import {fillArray, getNameKey} from '../utils'
import * as fb from 'firebase'
import user from "./user";

export default {
    state: {
        keyArray: '',
        basket: []
    },
    mutations: {
        updateState(state, {product, quantity}) {
            const duplicate = state.basket.find(item => item.id == product.id)
            if (duplicate) {
                duplicate.quantity += quantity;
                if (duplicate.quantity === 0) {
                    state.basket.splice(state.basket.indexOf(duplicate), 1);
                }
            } else {
                state.basket.push({
                    ...product,
                    quantity
                })
            }
        },
        loadBasket(state, {basket, keyArray}) {
            state.basket = basket;
            state.keyArray = keyArray;
        },
        clearState(state) {
            state.basket = [];
        },
        setBasket(state, basket) {
            state.basket = basket;
        },
    },
    actions: {
        async fetchBasket({commit, getters}) {
            commit('clearError')
            commit('setLoading', true);
            try {

                let ads;

                if (getters.isUser) {
                    const userId = getters.isUser.id
                    const userAds = await fb.database().ref('users/' + userId + '/ads/').once('value');
                    ads = userAds.val();
                } else {
                    const noneAds = await fb.database().ref('ads').once('value');
                    ads = noneAds.val();
                }

                if (ads !== null) {
                    const keyArray = getNameKey(ads)
                    const basket = [];
                    fillArray(ads, basket)
                    commit('loadBasket', {basket, keyArray})
                }
                commit('setLoading', false)

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },
        async fetchLocalStorage({commit}) {
            commit('clearError')
            commit('setLoading', true);
            try {
                let basket = []
                const data = JSON.parse(localStorage.getItem('key'))
                if(data) {
                    basket = data
                }
                commit('setBasket', basket)
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },
        async updateState({commit}, {product, quantity}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                commit('updateState', {product, quantity})
                commit('setLoading', false);
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async sendOrder({commit, getters}) {

            let ads, orders;

            if (getters.isUser) {
                const userId = getters.isUser.id
                orders = await fb.database().ref('users/' + userId + '/orders/')
                ads = await fb.database().ref('users/' + userId + '/ads/')
            } else {
                orders = await fb.database().ref('orders')
                ads = await fb.database().ref('ads')

            }

            orders.remove()
            orders.push(getters.basket)
            commit('clearState')
            ads.remove()

        },
        async addedItems({getters}) {

            let ads;

            if (getters.isUser) {
                const userId = getters.isUser.id
                ads = await fb.database().ref('users/' + userId + '/ads/')
            } else {
                ads = await fb.database().ref('ads')
            }

            if (getters.key !== '') {
                ads.remove()
            }
            ads.push(getters.basket)
        }
    },
    getters: {
        basket(state) {
            return state.basket
        },
        basketLength(state) {
            return state.basket.length
        },
        sumPrices(state) {
            return state.basket.reduce((sum, {price, quantity}) => sum + (+price * quantity), 0)
        },
        key(state) {
            return state.keyArray
        },
        isUser() {
            return user.state.user
        }
        ,
        isUserF() {
            return user.state.user
        }
    }
}