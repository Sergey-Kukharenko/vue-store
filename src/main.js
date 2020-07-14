import Vue from 'vue'
import * as fb from 'firebase'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store';

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyCG1kQRxjC47bGIdX8jeuz_Cthqk2eoinE",
      authDomain: "vue-store-b2a1b.firebaseapp.com",
      databaseURL: "https://vue-store-b2a1b.firebaseio.com",
      projectId: "vue-store-b2a1b",
      storageBucket: "vue-store-b2a1b.appspot.com",
      messagingSenderId: "1059771963856",
      appId: "1:1059771963856:web:64a3c4fb67db591a6d01d5"
    });

    fb.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    });

    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchFavorites')
    this.$store.dispatch('fetchBasket')
    this.$store.dispatch('fetchLocalStorage')
  },
  render: h => h(App),
}).$mount('#app')
