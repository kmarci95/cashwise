<template>
  <div class="mt-3">
    <h4 class="text-center mb-3" :class="titleColor">{{title}}</h4>
    <table class="table table-hover">
      <thead>
      <tr class="text-white" :class="backgroundColor">
        <td>Description</td>
        <td>Date</td>
        <td>Value</td>
        <td>Category</td>
        <td></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in array" :key="index" class="array-row">
        <td>{{item.description}}</td>
        <td>{{formatDate(item.date)}}</td>
        <td>+{{item.value}}</td>
        <td>{{item.category}}</td>
        <td class="array-row__delete">
          <span class="text-primary mr-2" @click="editBudget(item.key)">Edit</span>
          <span class="text-danger" @click="deleteBudget(item.key)">Delete</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: "BudgetListItem",
    props: {
      budget: {
        type: String,
        default: 'income'
      },
      array: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        isIncome: this.budget === 'income'
      }
    },
    computed: {
      title() {
        return this.isIncome ? 'Income' : 'Expenses';
      },
      titleColor() {
        return this.isIncome ? 'text-primary' : 'text-warning';
      },
      backgroundColor() {
        return this.isIncome ? 'bg-primary' : 'bg-warning';
      }
    },
    methods: {
      formatDate(date) {
        return moment(date).format('YYYY/MM/DD');
      },
      deleteBudget(key) {
        console.log(key, this.isIncome);
        this.$emit('deleteItem', key, this.isIncome);
      },
      editBudget(key) {
        console.log(key);
        this.$emit('editItem', {key, isIncome: this.isIncome});
      }
    },
  }
</script>

<style scoped lang="scss">
  .array-row {
    &__delete {
      opacity: 0;
      transition: all .2s ease-in-out;
      cursor: pointer;
    }

    &:hover &__delete {
      opacity: 1;
      transform: translateX(-2px);
    }
  }
</style>