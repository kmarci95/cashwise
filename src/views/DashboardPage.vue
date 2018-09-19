<template>
  <div>
    <navbar></navbar>
    <h1>Dashboard Page</h1>
  </div>
</template>

<script>
  import Navbar from "../components/Navbar/Navbar.vue";
  import axios from 'axios';

  export default {
    name: "DashboardPage",
    components: {Navbar},
  }
</script>

<style scoped>

</style>