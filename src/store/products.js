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


            const mockproducts = [
                {
                    id: '1',
                    name: 'Apple MacBook Pro 16" 8 Core i9 2,4 ГГц, 64 ГБ, 8 ТБ SSD, AMD Radeon Pro 5500M, Touch Bar, «серый космос»',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, repellat.',
                    img: '/img/products/macbook/1.jpg',
                    date: new Date().toLocaleDateString(),
                    price: '5990',
                    quantity: 1
                },
                {
                    id: '2',
                    name: 'Apple iPhone 11 Pro Max 512 ГБ «серый космос»',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores corporis dolores iusto nostrum praesentium quos repellat. At dicta dolores ea eveniet ex, facilis magni nesciunt officiis ratione tempore, vitae!',
                    img: '/img/products/iphone/1.jpg',
                    date: new Date().toLocaleDateString(),
                    price: '1020',
                    quantity: 1
                },
                {
                    id: '3',
                    name: 'Apple iPhone 11 Pro Max 512 ГБ «серый космос»',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, asperiores corporis dolores iusto nostrum praesentium quos repellat. At dicta dolores ea eveniet ex, facilis magni nesciunt officiis ratione tempore, vitae!',
                    img: '/img/products/iphone/1.jpg',
                    date: new Date().toLocaleDateString(),
                    price: '1020',
                    quantity: 1
                },
                {
                    id: '4',
                    name: 'Apple MacBook Pro 16" 8 Core i9 2,4 ГГц, 64 ГБ, 8 ТБ SSD, AMD Radeon Pro 5500M, Touch Bar, «серый космос»',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, repellat.',
                    img: '/img/products/macbook/1.jpg',
                    date: new Date().toLocaleDateString(),
                    price: '5990',
                    quantity: 1
                }
            ];

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
        }
    },
    getters: {
        products(state) {
            return state.products
        }
    }
}