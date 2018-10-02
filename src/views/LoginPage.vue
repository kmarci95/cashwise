<template>
  <div class="login-page">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-6 login-page__text">
          <h1 class="text-white">CashWise</h1>
          <h4 class="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, assumenda culpa et modi nulla pariatur porro rem sequi temporibus unde!</h4>
        </div>
        <div class="col-md-6">
          <div class="d-flex justify-content-start">
            <button class="btn" :class="[activeLink === 'Login' ? 'btn-light' : 'btn-primary']" @click="changeForm('Login')">Login</button>
            <button class="btn" :class="[activeLink === 'Register' ? 'btn-light' : 'btn-primary']" @click="changeForm('Register')">Register</button>
          </div>
          <login :active="activeLink"></login>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Login from "../components/Login/Login.vue";
  export default {
    name: "LoginPage",
    components: {Login},
    data() {
      return {
        activeLink: 'Login'
      }
    },
    methods: {
      changeForm(form) {
        this.activeLink = form;
      }
    },
  }
</script>

<style scoped lang="scss">
  .login-page {
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6)),url("../assets/images/city.jpg");
    background-size: cover;

    &__text {
      h1 {
        font-size: 56px;
      }
    }
  }

  button, .btn:focus, .btn:active {
    outline: none !important;
  }
</style>