<template>
  <div>
    <navbar></navbar>
    <h1>Dashboard Page</h1>
    <myfooter></myfooter>
  </div>
</template>

<script>
  import Navbar from "../components/Navbar/Navbar.vue";
  import MyFooter from "../components/Footer/MyFooter.vue";
  import Home from "./Home.vue";
  import axios from 'axios';

  export default {
    name: "DashboardPage",
    components: {Navbar, MyFooter},
  }
</script>

<style scoped>

</style>