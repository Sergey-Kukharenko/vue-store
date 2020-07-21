import data from "../data/data";
import {createArrayBetweenValues, sum} from "../utils";

export default {
    state: {
        products: [],
        filled: false
    },
    mutations: {
        fetchProducts(state, payload) {
            state.products = payload;
        },
        loadMoreProducts(state, payload) {
            state.products = [...state.products, ...payload]
        },
    },
    actions: {
        fetchProducts({commit}) {
            commit('clearError')
            commit('setLoading', true);


            const mockProducts = data;
            const products = []
            // const products2 = []

            try {
                const partOfArray = (arr, size) => arr.slice(0, size).map(item => products.push(item))

                partOfArray(mockProducts, 8)
                commit('fetchProducts', products)
                commit('setLoading', false)

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },
        loadMoreProducts({commit, getters}) {
            commit('clearError')
            commit('setLoading', true);
            try {
                const products = getters.products
                const moreProducts = []

                if (products.length === data.length) {
                    this.filled = true
                    return
                } else {
                    const lengthArray = getters.products.length
                    const increaseByNumber = 4
                    const uploadNumber = sum(lengthArray, increaseByNumber)
                    createArrayBetweenValues(lengthArray, uploadNumber, data, moreProducts)
                }
                commit('loadMoreProducts', moreProducts)
                commit('setLoading', false)

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },
    },
    getters: {
        products(state) {
            return state.products
        },
        productById(state) {
            return detailId => {
                return state.products.find(product => product.id === detailId)
            }
        }
    }
}