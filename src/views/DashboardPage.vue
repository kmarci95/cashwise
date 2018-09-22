<template>
  <div class="dashboard">
    <navbar></navbar>
    <router-view></router-view>
    <my-footer></my-footer>
    <div class="dashboard__background"></div>
  </div>
</template>

<script>
  import Navbar from "../components/Navbar/Navbar.vue";
  import Budget from "../components/Budget/Budget.vue";
  import MyFooter from "../components/Footer/MyFooter.vue";
  
  export default {
    name: "DashboardPage",
    components: {Budget, Navbar, MyFooter},
    created() {
      this.$store.dispatch('fetchUser', this.$store.getters.getUserId);
    }
  }
</script>

<style scoped lang="scss">
  .dashboard {
    position: relative;

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),url("../assets/images/photo-1518235506717-e1ed3306a89b.jpeg");
      background-size: cover;
      z-index: -1;
    }
  }
</style>