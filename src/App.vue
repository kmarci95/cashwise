<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "./components/UIElements/Navbar/Navbar.vue";
  import 'jquery/dist/jquery.min';
  import 'popper.js/dist/popper.min';

  export default {
    components: {Navbar},
    created() {
      this.$store.dispatch('tryAutoLogin');
      const isAuthenticated = this.$store.getters.isAuthenticated;
      if(isAuthenticated) {
        this.$router.push('/dashboard');
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/style/bootstrap.css";
  @import "~@fortawesome/fontawesome-free/css/all.css";
  @import "~material-design-icons/iconfont/material-icons.css";

  .btn:focus, .btn:active {
    box-shadow: none !important;
  }

  .body {
    overflow: hidden;
  }

</style>
