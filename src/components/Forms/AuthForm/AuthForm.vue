<template>
  <div class="form-group mb-0">
    <label for="authFormEmail" class="text-left">Email</label>
    <input type="email" class="form-control mb-2" :class="{'is-invalid': emailError.error}" id="authFormEmail"
           placeholder="Email" v-model="email">
    <div class="invalid-feedback" v-if="emailError.error">{{emailError.errorMsg}}</div>

    <label for="authFormPass">Password</label>
    <input type="password" class="form-control mb-2" :class="{'is-invalid': passwordError.error}" id="authFormPass"
           placeholder="Password" v-model="password">
    <div class="invalid-feedback" v-if="passwordError.error">{{passwordError.errorMsg}}</div>

    <label v-if="active === 'Register'" for="authFormname">Name</label>
    <input v-if="active === 'Register'" type="text" class="form-control" :class="{'is-invalid': nameError.error}" id="authFormname"
           placeholder="Name" v-model="name">
    <div class="invalid-feedback" v-if="nameError.error">{{nameError.errorMsg}}</div>

    <button type="button" class="btn btn-primary btn-lg btn-block mt-4" @click="submit">{{active}}</button>
  </div>
</template>

<script>
  import { validate } from "../../../utilities/validation";

  export default {
    name: "AuthForm",
    props: {
      active: {
        type: String,
        default: 'Login'
      },
    },
    data() {
      return {
        email: '',
        password: '',
        name: '',
        emailError: {
          errorMsg: '',
          error: false
        },
        passwordError: {
          errorMsg: '',
          error: false
        },
        nameError: {
          errorMsg: '',
          error: false
        },
      }
    },
    watch: {
      active() {
        this.emailError = {
          errorMsg: '',
          error: false
        };
        this.passwordError = {
          errorMsg: '',
          error: false
        }
      }
    },
    methods: {
      submit() {
        this.emailError = validate(this.email, 'email');
        this.passwordError = validate(this.password, 'password');
        if(!this.emailError.error && !this.passwordError.error && !this.nameError.error) {
          if(this.active === 'Login') {
            this.$store.dispatch('login', {email: this.email, password: this.password})
              .then(res => this.$router.push('/dashboard'));
          } else if(this.active === 'Register') {
            this.$store.dispatch('register', {email: this.email, password: this.password, name: this.name})
              .then(res => this.$router.push('/dashboard'));
          }
        }
      }
    },
  }
</script>

<style scoped>

</style>