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
            <button class="btn btn-primary mt-3" @click="changeInfo">Change</button>
          </div>

          <div class="p-3">
            <h4 class="mb-4">Your Categories</h4>
            <div class="d-flex mb-3">
              <div class="w-25 mr-3">
                <input type="text" class="form-control" :class="{'is-invalid': categoryError.error}" id="addCategory"
                       placeholder="Category name" v-model="category">
                <div class="invalid-feedback" v-if="categoryError.error">{{categoryError.errorMsg}}</div>
              </div>
              <div>
                <button class="btn btn-primary" @click="addCategory">Add Category</button>
              </div>
            </div>
            <div v-if="!categories">
              <p>You don't have categories yet</p>
            </div>
            <div v-else>
              <div v-for="category in categories">
                {{category.label}}
              </div>
            </div>
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
        },
        category: '',
        categoryError: {
          error: false,
          errorMsg: ''
        }
      }
    },
    computed: {
      categories() {
        return this.$store.getters.getCategories;
      }
    },
    methods: {
      changeInfo() {
        this.nameError = validate(this.name, 'text');
        if(!this.nameError.error) {
          this.$store.dispatch('changeUserName', this.name);
        }
      },
      addCategory() {
        this.categoryError = validate(this.category, 'text');
        if(!this.categoryError.error) {
          this.$store.dispatch('addCategory', this.category);
          this.category = '';
        }
      }
    },
  }
</script>

<style scoped>

</style>