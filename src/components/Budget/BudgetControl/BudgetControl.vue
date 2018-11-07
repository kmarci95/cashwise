<template>
  <<<<<<< HEAD
  <div class="bg-white p-3">
    <div class="d-flex justify-content-between">
      <h5 class="m-0">Add Budget</h5>
      <span class="close" @click="$emit('close')"><i class="material-icons">clear</i></span>
    </div>

    <hr>
    <form class="budget-control">
      <div class="row add mt-5 d-flex justify-content-center">
        <div class="d-flex justify-content-center col-lg-12 py-2 px-4">
          <select class="expense custom-select mb-3" id="expense" v-model="budget.amplitude">
            <option>-</option>
            <option>+</option>
          </select>
          <input type="text" class="desc form-control mb-3" placeholder="Add Description" v-model="budget.description">
          <input type="number" min="0" class="value form-control mb-3" placeholder="Value" v-model="budget.value">
          <select class="category custom-select mb-3" id="category" v-if="categories.length" v-model="budget.category">
            <option disabled>Categories</option>
            <option v-for="(category, index) in categories" :key="index">{{category.label}}</option>
          </select>
          <datepicker class="date mb-3" wrapper-class="datepicker" input-class="w-100 px-2" placeholder="Date"
                      v-model="budget.date"></datepicker>
          <button class="btn btn-block" :class="buttonColor" @click="add" type="button">{{buttonText}}</button>
        </div>
      </div>
    </form>
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
    props: {
      keyString: {
        type: String,
        default: ''
      },
      budgetType: {
        type: String,
        default: ''
      }
    },
    created() {
      if(this.keyString) {
        if(this.budgetType === 'income') {
          this.budget = {...this.$store.getters.getUserIncome(this.keyString)};
          this.budget.amplitude = '+';
        } else {
          this.budget = {...this.$store.getters.getUserExpense(this.keyString)};
          this.budget.amplitude = '-';
        }
      }
    },
    computed: {
      categories() {
        return this.$store.getters.getCategories;
      },
      buttonText() {
        const isEditString = this.keyString ? 'Edit' : 'Add';
        return this.budget.amplitude === '-' ? `${isEditString} Expense` : `${isEditString} Income`;
      },
      buttonColor() {
        return this.budget.amplitude === '-' ? 'btn-warning' : 'btn-primary';
      }
    },
    data() {
      return {
        budget: {
          amplitude: '-',
          description: '',
          value: '',
          category: 'Categories',
          date: new Date(),
        },
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
        this.descriptionError = validate(this.budget.description, 'text');
        this.valueError = validate(this.budget.value, 'number');
        if(!this.descriptionError.error && !this.valueError.error && this.budget.category !== 'Categories') {
          if(this.budget.amplitude === '+') {
            if(this.keyString) {
              this.$store.dispatch('editIncome', this.budget)
                .then(res => {
                  this.$emit('close');
                });
            } else {
              this.$store.dispatch('addIncome', this.budget)
                .then(res => {
                  this.$emit('close');
                })
            }
          } else {
            if(this.keyString) {
              this.$store.dispatch('editExpense', this.budget)
                .then(res => this.$emit('close'))
            } else {
              this.$store.dispatch('addExpense', this.budget)
                .then(res => {
                  this.$emit('close');
                })
            }

          }
        }
      }
    },
  }
</script>

<style lang="scss">
  .budget-control {

  }

  .add {
    background-color: #e2e6ea;
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

  .close {
    cursor: pointer;
  }
</style>