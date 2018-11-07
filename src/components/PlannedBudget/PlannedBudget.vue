<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 bg-white shadow my-5 py-3">
        <div class="">
          <div v-if="loading">
            <h2>Loading</h2>
          </div>
          <div v-else>
            <div class="row">
              <div class="col-lg-12">
                <h3 class="text-center">Planned Budgets</h3>
              </div>
              <div class="col-lg-12">
                <planned-budget-form></planned-budget-form>
              </div>
              <div class="col-lg-12">
                <planned-budget-list :plannedBudgets="plannedBudgets"></planned-budget-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PlannedBudgetForm from "../Forms/PlannedBudgetForm/PlannedBudgetForm.vue";
  import PlannedBudgetList from "./PlannedBudgetList/PlannedBudgetList";
  export default {
    name: "PlannedBudget",
    components: {PlannedBudgetList, PlannedBudgetForm},
    computed: {
      loading() {
        return this.$store.getters.getUserLoading;
      },
      plannedBudgets() {
        return this.$store.getters.getUserPlannedBudgets;
      }
    },
  }
</script>

<style scoped>

</style>