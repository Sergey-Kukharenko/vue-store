<template>
  <div id="app" class="p-0_35">
    <router-view></router-view>
  </div>
</template>

<script>
  import {setLocalStorage} from "./utils";

  export default {
    name: 'App',
    created() {
      this.leavePage()
    },
    methods: {
      leavePage() {
        const isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
        const eventName = isOnIOS ? "pagehide" : "beforeunload";
        window.addEventListener(eventName, this.send)
      },
      send() {
        this.saveLocalStorage()
        return this.$store.dispatch('addedItems')
      },
      getAdds() {
        return this.$store.getters.basket
      },
      saveLocalStorage() {
        const ads = this.getAdds();
        setLocalStorage('key', ads)
      }
    }
  }
</script>

<style>

  body {
    font-family: 'Gotham SSm A', 'Gotham SSm B', 'Inter', system-ui, 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Arial, sans-serif;
    margin: 0;
  }

  .is-authentication{
    overflow: hidden;
  }

</style>