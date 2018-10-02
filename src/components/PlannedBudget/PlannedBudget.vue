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
              <div class="col-lg-6">
                <planned-budget-form></planned-budget-form>
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
  export default {
    name: "PlannedBudget",
    components: {PlannedBudgetForm},
    computed: {
      loading() {
        return this.$store.getters.getUserLoading;
      }
    },
  }
</script>

<style scoped>

</style>