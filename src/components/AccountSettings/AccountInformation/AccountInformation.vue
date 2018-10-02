<template>
  <div class="p-3">
    <h4 class="mb-4">Information</h4>
    <label for="nameEdit">Name</label>
    <input type="text" class="form-control" :class="{'is-invalid': nameError.error}" id="nameEdit"
           placeholder="Name" v-model="name">
    <div class="invalid-feedback" v-if="nameError.error">{{nameError.errorMsg}}</div>
    <button class="btn btn-primary mt-3" @click="changeInfo">Change</button>
  </div>
</template>

<script>
  import {validate} from '../../../utilities/validation';

  export default {
    name: "AccountInformation",
    created() {
      this.name = this.$store.getters.getUserName;
    },
    data() {
      return {
        name: '',
        nameError: {
          error: false,
          errorMsg: ''
        },
      }
    },
    methods: {
      changeInfo() {
        this.nameError = validate(this.name, 'text');
        if(!this.nameError.error) {
          this.$store.dispatch('changeUserName', this.name);
        }
      },
    },
  }
</script>

<style scoped>

</style>