<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 bg-white shadow my-5 py-3">
        <div class="">
          <div v-if="loading">
            <h2>Loading</h2>
          </div>
          <div v-else>
            <budget-header></budget-header>

            <ul class="nav nav-tabs my-3">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#budget">Budget</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#plannedBudgets">Planned Budgets</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#goals">Goals</a>
              </li>
            </ul>

            <div id="myTabContent" class="tab-content">
              <div class="tab-pane fade show active" id="budget">
                <button class="btn btn-primary" @click="openBudgetControlModal">Add Budget</button>
                <budget-list></budget-list>
              </div>
              <div class="tab-pane fade" id="plannedBudgets">
                <button class="btn btn-primary" @click="openPlannedBudgetModal">Add Planned Budget</button>
                <planned-budget-list :planned-budgets="plannedBudgets"></planned-budget-list>
              </div>
              <div class="tab-pane fade" id="goals">
                <button class="btn btn-primary" @click="openGoalModal">Add Goal</button>
                <goal-list :goals="goals"></goal-list>
              </div>
            </div>

            <budget-control-modal title="Add Budget" :show="budgetControlModalShow" @close="openBudgetControlModal"></budget-control-modal>
            <planned-budget-modal :show="plannedBudgetModalShow" @close="openPlannedBudgetModal"></planned-budget-modal>
            <goal-modal :show="goalModalShow" @close="openGoalModal"></goal-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BudgetHeader from "./BudgetHeader/BudgetHeader.vue";
  import BudgetControl from "./BudgetControl/BudgetControl.vue";
  import BudgetList from './BudgetList/BudgetList.vue';
  import Modal from '../UIElements/Modal/Modal.vue';
  import BudgetControlModal from "./BudgetControlModal/BudgetControlModal.vue";
  import PlannedBudgetModal from "../PlannedBudget/PlannedBudgetModal/PlannedBudgetModal.vue";
  import GoalModal from "../Goals/GoalModal/GoalModal.vue";
  import PlannedBudgetList from "../PlannedBudget/PlannedBudgetList/PlannedBudgetList";
  import GoalList from "../Goals/GoalList/GoalList";

  export default {
    name: "Budget",
    components: {
      GoalList,
      PlannedBudgetList,
      GoalModal,
      PlannedBudgetModal,
      BudgetControlModal,
      BudgetControl,
      BudgetHeader,
      BudgetList,
      Modal
    },
    computed: {
      loading() {
        return this.$store.getters.getUserLoading;
      },
      plannedBudgets() {
        return this.$store.getters.getUserPlannedBudgets;
      },
      goals() {
        return this.$store.getters.getUserGoals;
      }
    },
    data() {
      return {
        budgetControlModalShow: false,
        plannedBudgetModalShow: false,
        goalModalShow: false
      }
    },
    methods: {
      openBudgetControlModal() {
        this.budgetControlModalShow = !this.budgetControlModalShow;
      },
      openPlannedBudgetModal() {
        this.plannedBudgetModalShow = !this.plannedBudgetModalShow;
      },
      openGoalModal() {
        this.goalModalShow = !this.goalModalShow;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>