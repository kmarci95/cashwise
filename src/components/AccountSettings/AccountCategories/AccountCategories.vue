<template>
  <div class="p-3">
    <h4 class="mb-4">Your Categories</h4>
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex mb-4">
          <div class="mr-3">
            <input type="text" class="form-control" :class="{'is-invalid': categoryError.error}" id="addCategory"
                   placeholder="Category name" v-model="category">
            <div class="invalid-feedback" v-if="categoryError.error">{{categoryError.errorMsg}}</div>
          </div>
          <div>
            <button class="btn btn-primary" @click="addCategory">Add Category</button>
          </div>
        </div>
      </div>
      <div v-if="!categories.length" class="col-lg-12">
        <p>You don't have categories yet</p>
      </div>
      <div v-else class="col-lg-4" v-for="category in categories">
        <category :category="category"></category>
      </div>
    </div>
  </div>
</template>

<script>
  import {validate} from '../../../utilities/validation';
  import axios from 'axios';
  import Category from "../Category/Category.vue";

  export default {
    name: "AccountCategories",
    components: {Category},
    data() {
      return {
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
      addCategory() {
        this.categoryError = validate(this.category, 'text');
        if(!this.categoryError.error) {
          this.$store.dispatch('addCategory', this.category);
          this.category = '';
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .category {
    cursor: pointer;
    transition: all .3s ease-in-out;

    &__label {
      transform: translateX(7px);
      transition: all .15s ease-in-out;
    }

    i {
      opacity: 0;
    }

    &:hover &__label {
      transform: translateX(-8px);
    }

    &:hover i {
      opacity: 1;
    }
  }

  .edit-category {
    background-color: #f7f7f7;

    &__close {
      cursor: pointer;
    }
  }
</style>