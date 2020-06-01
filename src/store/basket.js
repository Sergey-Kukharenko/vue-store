export default {
    state: {
        basket: []
    },
    mutations: {
        updateState(state, {product, quantity}) {
            const dublicate = state.basket.find(item => item.id == product.id)
            if (dublicate) {
                dublicate.quantity += quantity;
                if (dublicate.quantity === 0) {
                    state.basket.splice(state.basket.indexOf(dublicate), 1);
                }
            } else {
                state.basket.push(product)
            }
        }
    },
    actions: {
        updateState({commit, getters}, {product, quantity}) {
            commit('updateState', {product, quantity})
            console.log(getters.sumPrices)
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
    }

}