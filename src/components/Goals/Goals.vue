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
                <h3 class="text-center">Goals</h3>
              </div>
              <div class="col-lg-6">
                <goal-form></goal-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoalForm from "../Forms/GoalForm/GoalForm.vue";
  export default {
    name: "Goals",
    components: {GoalForm}
  }
</script>

<style scoped>

</style>