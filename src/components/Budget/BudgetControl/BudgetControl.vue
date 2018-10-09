<template>
  <div class="row add mt-5 d-flex justify-content-center">
    <div class="d-flex justify-content-center col-lg-12 py-2 px-4">
      <select class="expense form-control mr-3" id="expense" v-model="amplitude">
        <option>-</option>
        <option>+</option>
      </select>
      <input type="text" class="desc form-control mr-3" placeholder="Add Description" v-model="description">
      <input type="number" min="0" class="value form-control mr-3" placeholder="Value" v-model="value">
      <select class="category form-control mr-3" id="category" v-if="categories.length" v-model="category">
        <option disabled>Categories</option>
        <option v-for="(category, index) in categories" :key="index">{{category.label}}</option>
      </select>
      <datepicker class="date mr-3" wrapper-class="datepicker" input-class="px-2" placeholder="Date" v-model="date"></datepicker>
      <button class="btn" :class="buttonColor" @click="add">{{buttonText}}</button>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import { validate } from "../../../utilities/validation";

  export default {
    name: "BudgetControl",
    components: {
      Datepicker
    },
    computed: {
      categories() {
        return this.$store.getters.getCategories;
      },
      buttonText() {
        return this.amplitude === '-' ? 'Add Expense' : 'Add Income';
      },
      buttonColor() {
        return this.amplitude === '-' ? 'btn-warning' : 'btn-primary';
      }
    },
    data() {
      return {
        amplitude: '-',
        description: '',
        value: '',
        category: 'Categories',
        date: new Date(),
        descriptionError: {
          descriptionMsg: '',
          error: false
        },
        valueError: {
          valueMsg: '',
          error: false
        },
        categoryError: {
          categoryMsg: '',
          error: false
        },
        dateError: {
          dateMsg: '',
          error: false
        },
      }
    },
    methods: {
      add() {
        this.descriptionError = validate(this.description, 'text');
        this.valueError = validate(this.value, 'number');
        if(!this.descriptionError.error && !this.valueError.error && this.category !== 'Categories') {
          if(this.amplitude === '+') {
            this.$store.dispatch('addIncome', {
              description: this.description,
              value: this.value,
              category: this.category,
              date: this.date
            })
              .then(res => {
                this.description = '';
                this.value = '';
                this.category = 'Categories';
                this.date = new Date();
              })
          } else {
            this.$store.dispatch('addExpense', {
              description: this.description,
              value: this.value,
              category: this.category,
              date: this.date
            })
              .then(res => {
                this.description = '';
                this.value = '';
                this.category = 'Categories';
                this.date = new Date();
              })
          }
        }
      }
    },
  }
</script>

<style lang="scss">
  .add {
    background-color: #e2e6ea;

    .expense {
      flex: 1;
    }

    .desc {
      flex: 3;
    }

    .value {
      flex: 3;
    }

    .category {
      flex: 2;
    }

    .date {
      flex: 1;
    }

    .btn {
      flex: 1;
    }
  }

  .datepicker {
    div:first-child {
      height: 100%;
      display: flex;
    }

    input {
      border: 1px solid #ced4da;
      padding: 6px 12px;

      &::placeholder {
        color: #7e868e;
      }
    }
  }
</style>