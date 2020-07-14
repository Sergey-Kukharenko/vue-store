import {getNameKey, fillArray} from '../utils'
import * as fb from 'firebase'

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
        async fetchBasket({commit}) {
            commit('clearError')
            commit('setLoading', true);
            try {
                const fbVal = await fb.database().ref('ads').once('value');
                const ads = fbVal.val();
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
                const basket = JSON.parse(localStorage.getItem('key'))
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
            const refOrders = await fb.database().ref('orders')
            refOrders.remove()
            refOrders.push(getters.basket)
            commit('clearState')
            const refAds = await fb.database().ref('ads')
            refAds.remove()
        },
        async addedItems({getters}) {
            const ref = await fb.database().ref('ads')
            if (getters.key !== '') {
                ref.remove()
            }
            ref.push(getters.basket)
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
        }
    }
}