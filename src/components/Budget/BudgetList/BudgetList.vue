<template>
  <div class="row">
    <template v-if="incomes.length && expenses.length">
      <div class="col-lg-6">
        <budget-list-item budget="income" :array="incomes"></budget-list-item>
      </div>
      <div class="col-lg-6">
        <budget-list-item budget="expenses" :array="expenses"></budget-list-item>
      </div>
    </template>
    <div class="col-lg-12 mt-5" v-else>
      <h4 class="text-center">No incomes or Expenses</h4>
    </div>
  </div>
</template>

<script>
  import BudgetListItem from "./BudgetListItem/BudgetListItem.vue";

  export default {
    components: {BudgetListItem},
    computed: {
      incomes() {
        return this.$store.getters.getUserIncomes;
      },
      expenses() {
        return this.$store.getters.getUserExpenses;
      }
    },
  }
</script>

<style scoped>

</style>