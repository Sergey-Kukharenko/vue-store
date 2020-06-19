import data from "../data/data";

export default {
    state: {
        favorites: []
    },
    mutations: {
        loadFavorites(state, payload) {
            state.favorites = payload;
        },
        updateFavorites({favorites}, payload) {
            const arr = favorites;
            const foundItem = arr.find(item => item.name === payload.name && item.id === payload.id);

            foundItem ? arr.splice(arr.indexOf(foundItem), 1) : arr.push(payload)

            console.log(arr)

        },
    },
    actions: {
        fetchFavorites({commit}) {
            commit('clearError')
            commit('setLoading', true);


            const mockproducts = data;

            try {
                const favorites = mockproducts.filter(item => item.favorite)

                commit('loadFavorites', favorites)
                commit('setLoading', false)

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }
        },
        updateFavorites({commit}, payload) {
            commit('updateFavorites', payload)
        },
    },
    getters: {
        favorites(state) {
            return state.favorites
        }
    }
}