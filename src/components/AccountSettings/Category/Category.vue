<template>
  <div class="edit-category p-2 mb-3">
    <div class="edit-category__title mb-2">
      <h5>{{category.label}}</h5>
    </div>
    <div class="edit-category__edit d-flex justify-content-between">
      <div class="mr-3">
        <input type="text" class="form-control" :class="{'is-invalid': editedCategoryError.error}" id="editCategory"
               placeholder="Category name" v-model="editingCategory.label">
        <div class="invalid-feedback" v-if="editedCategoryError.error">{{editedCategoryError.errorMsg}}</div>
      </div>
      <div class="mb-2">
        <button class="btn btn-primary mr-2" @click="editCategory">Edit</button>
        <button class="btn btn-danger" @click="deleteCategory">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Category",
    props: {
      category: {
        type: Object,
        default: 0
      },
    },
    created() {
      this.editingCategory = {...this.category};
    },
    data() {
      return {
        editing: false,
        editedCategory: this.category.label,
        editingCategory: {},
        editedCategoryError: {
          error: false,
          errorMsg: ''
        }
      }
    },
    methods: {
      editCategory() {
        if(this.editingCategory.label !== this.editedCategory) {
          this.$store.dispatch('editCategory', this.editingCategory);
        }
      },
      deleteCategory() {
        this.$store.dispatch('deleteCategory', this.editingCategory);
        this.$store.dispatch('displayInfoBar', {color: 'alert-danger', title: `${this.editingCategory.label} removed!`, text: 'You have deleteted one of your categories'})
      }
    }
  }
</script>

<style scoped lang="scss">
  .edit-category {
    height: 100px;
    cursor: pointer;

    &__title {
      h5 {
        font-size: 24px;
        transform: translate3d(0,100%,0);
        padding-left: 10px;
        transition: all .2s ease-in-out;
      }
    }

    &__edit {
      opacity: 0;
      transition: all .2s ease-in-out;
    }

    &:hover &__edit {
      opacity: 1;
    }

    &:hover &__title h5 {
      font-size: 18.75px;
      transform: translateY(0);
      padding-left: 0;
    }
  }
</style>