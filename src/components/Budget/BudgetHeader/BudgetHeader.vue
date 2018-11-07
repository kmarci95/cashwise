<template>
  <div class="d-flex flex-column align-items-center">
    <h3 class="text-center">Available Budget in {{date}}:</h3>
    <h2 class="text-center">{{budget}}</h2>
    <div class="d-flex">
      <div class="d-flex justify-content-between bg-primary mr-3 p-2">
        <p class="text-white mb-0 mr-3">Income: </p>
        <p class="text-white mb-0">{{income}}</p>
      </div>
      <div class="d-flex justify-content-between bg-warning p-2">
        <p class="text-white mb-0 mr-3">Expenses: </p>
        <p class="text-white mb-0">{{expenses}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { monthNames } from '../../../utilities/months';

  export default {
    name: "BudgetHeader",
    data() {
      return {
        date: `${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`
      }
    },
    computed: {
      budget() {
        return (this.income - this.expenses).toLocaleString();
      },
      income() {
        return this.$store.getters.getIncome;
      },
      expenses() {
        return this.$store.getters.getExpense;
      }
    },
  }
</script>

<style scoped>

</style>