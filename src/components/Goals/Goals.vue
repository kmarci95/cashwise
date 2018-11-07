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
              <div class="col-lg-12">
                <goal-form></goal-form>
              </div>
              <div class="col-lg-12">
                <goal-list :goals="goals"></goal-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  import GoalForm from "../Forms/GoalForm/GoalForm";
  import GoalList from "./GoalList/GoalList";
  export default {
    name: "Goals",
    components: {GoalList, GoalForm},
    computed: {
      loading() {
        return this.$store.getters.getUserLoading;
      },
      goals() {
        return this.$store.getters.getUserGoals;
      }
    }
  }
</script>

<style scoped lang="scss">

</style>