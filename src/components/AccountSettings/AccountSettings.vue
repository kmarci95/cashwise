<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="bg-white shadow mt-5 py-3">
          <h3 class="text-center">Account Settings</h3>

          <div class="p-3">
            <h4 class="mb-4">Information</h4>
            <label for="nameEdit">Name</label>
            <input type="text" class="form-control" :class="{'is-invalid': nameError.error}" id="nameEdit"
                   placeholder="Name" v-model="name">
            <div class="invalid-feedback" v-if="nameError.error">{{nameError.errorMsg}}</div>
            <button class="btn btn-primary mt-4" @click="submit">Change</button>
          </div>

          <div class="p-3">
            <h4 class="mb-4">Categories</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {validate} from '../../utilities/validation';

  export default {
    name: "AccountSettings",
    created() {
      this.name = this.$store.getters.getUserName;
    },
    data() {
      return {
        name: '',
        nameError: {
          error: false,
          errorMsg: ''
        }
      }
    },
    methods: {
      submit() {
        this.nameError = validate(this.name, 'text');
        if(!this.nameError.error) {
          this.$store.dispatch('changeUserName', this.name);
        }
      }
    },
  }
</script>

<style scoped>

</style>