import {fillArray, getLocalStorage, getNameKey} from '../utils'
import user from "./user";
import {firebaseGet, firebaseGetVal} from "../firebase";
import {pathAds, pathOrders, pathUserAds, pathUserOrders} from "../firebase/path";

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
        setBasket(state, basket) {
            state.basket = basket;
        },
        clearState(state) {
            state.basket = [];
        }
    },
    actions: {
        async fetchBasket({commit, getters}) {
            commit('clearError')
            commit('setLoading', true);
            try {
                let ads;
                if (getters.isUser) {
                    const userId = getters.isUser.id
                    ads = await firebaseGetVal(pathUserAds(userId))
                } else {
                    ads = await firebaseGetVal(pathAds)
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
                const data = getLocalStorage('key')

                if (data) {
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
                orders = await firebaseGet(pathUserOrders(userId))
                ads = await firebaseGet(pathUserAds(userId))
            } else {
                orders = await firebaseGet(pathOrders)
                ads = await firebaseGet(pathAds)
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
                ads = await firebaseGet(pathUserAds(userId))
            } else {
                ads = await firebaseGet(pathAds)
            }
            if (getters.key !== '') {
                ads.remove()
            }
            ads.push(getters.basket)
        },
        clearBasket({commit}) { // https://www.npmjs.com/package/emailjs-com
            commit('clearState');
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
    }
}