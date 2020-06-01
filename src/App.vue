<template>
  <div id="app">

    <app-list></app-list>
    <app-fab></app-fab>
    <app-basket-modal></app-basket-modal>

  </div>
</template>

<script>

  import List from "./components/List";
  import Fab from "./components/Fab";
  import BasketModal from "./components/BasketModal";

  export default {
    name: 'App',
    components: {
      'app-list': List,
      'app-fab': Fab,
      'app-basket-modal': BasketModal,
    }

  }
</script>

<style>

  body {
    font-family: 'Gotham SSm A', 'Gotham SSm B', 'Inter', system-ui, 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Droid Sans', Arial, sans-serif;
  }

</style>
