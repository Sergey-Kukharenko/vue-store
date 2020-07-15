import data from "../data/data";

export default {
    state: {
        products: []
    },
    mutations: {
        loadProducts(state, payload) {
            state.products = payload;
        },
    },
    actions: {
        fetchProducts({commit}) {
            commit('clearError')
            commit('setLoading', true);


            const mockproducts = data;

            const products = []

            try {
                mockproducts.map((item) => {
                    products.push(item)
                })

                commit('loadProducts', products)
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