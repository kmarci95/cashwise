<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 bg-white shadow mt-5 py-3">
        <div class="">
          <div v-if="loading">
            <h2>Loading</h2>
          </div>
          <div v-else>
            <budget-header></budget-header>
            <budget-control></budget-control>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import BudgetHeader from "./BudgetHeader/BudgetHeader.vue";
  import BudgetControl from "./BudgetControl/BudgetControl";

  export default {
    name: "Budget",
    components: {
      BudgetControl,
      BudgetHeader
    },
    computed: {
      loading() {
        return this.$store.getters.getUserLoading;
      }
    },
    methods: {
      add() {
        axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${this.$store.getters.getUser.key}/incomes.json`, {
          value: '344000'
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>