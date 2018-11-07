<template>
  <div class="dashboard">
    <navbar></navbar>
    <router-view></router-view>
    <infobar></infobar>
    <div class="dashboard__background"></div>
  </div>
</template>

<script>
  import Navbar from "../components/UIElements/Navbar/Navbar.vue";
  import Budget from "../components/Budget/Budget.vue";
  import Infobar from "../components/UIElements/Infobar/Infobar.vue";

  export default {
    name: "DashboardPage",
    components: {Infobar, Budget, Navbar},
    created() {
      this.$store.dispatch('fetchUser', this.$store.getters.getUserId);
    }
  }
</script>

<style scoped lang="scss">
  .dashboard {
    position: relative;

    &__background {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url("../assets/images/city.jpg");
      background-size: cover;
      z-index: -1;
    }
  }
</style>