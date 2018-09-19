<template>
    <div class="card border-0">
      <div class="card-body">
        <auth-form :active="active"></auth-form>
      </div>
    </div>
</template>

<script>
  import AuthForm from "../Forms/AuthForm/AuthForm.vue";

  export default {
    name: "Login",
    components: {AuthForm},
    props: {
      active: {
        type: String,
        default: 'login'
      },
    },
  }
</script>

<style scoped>

</style>