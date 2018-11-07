<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link to="/dashboard" class="navbar-brand">CashWise</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/dashboard/account-settings" exact class="nav-link">Account Settings</router-link>
          </li>
          <li class="nav-item" @click="logout">
            <router-link to="/" exact class="nav-link">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Navbar",
    methods: {
      logout() {
        this.$store.dispatch('logout');
      }
    },
  }
</script>

<style scoped>
  .router-link-exact-active {
    color: white !important;
  }

</style>