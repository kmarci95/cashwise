<template>
  <div class="mt-5">
    <h4 class="text-center text-primary mb-3">Goals</h4>
    <table class="table table-hover">
      <thead>
      <tr class="text-white bg-primary">
        <td>Description</td>
        <td>Deadline</td>
        <td>Value</td>
        <td>Money needed</td>
        <td>Remaining Days</td>
        <td></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(goal, index) in goals" :key="index" class="goals-row">
        <td>{{goal.description}}</td>
        <td>{{formatDate(goal.date)}}</td>
        <td>{{parseFloat(goal.value).toLocaleString()}}</td>
        <td>{{remainingValue(goal.value)}}</td>
        <td>{{remainingDays(goal.date)}}</td>
        <td class="goals-row__delete">
          <span class="text-primary mr-2" @click="editGoal(goal.key)">Edit</span>
          <span class="text-danger" @click="deleteGoal(goal.key)">Delete</span>
        </td>
      </tr>
      </tbody>
    </table>
    <confirm-modal :show="confirmModalShow" @close="openConfirmModal" title="Do you want to delete this goal?"
                   cancel-text="Cancel"
                   confirm-text="Delete"
                   text="This goal will be deleted from your account"
                   @confirm="confirmDelete"></confirm-modal>
    <goal-modal :show="goalModalShow" :keyString="selectedGoal" @close="openGoalModal"></goal-modal>
  </div>
</template>

<script>
  import moment from 'moment';
  import GoalModal from "../GoalModal/GoalModal";
  import ConfirmModal from '../../UIElements/ConfirmModal/ConfirmModal.vue';

  export default {
    name: "GoalList",
    components: {GoalModal, ConfirmModal},
    props: {
      goals: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        goalModalShow: false,
        confirmModalShow: false,
        selectedGoal: '',
      }
    },
    computed: {
      budget() {
        return this.$store.getters.getIncome - this.$store.getters.getExpense;
      }
    },
    methods: {
      formatDate(date) {
        return moment(date).format('YYYY/MM/DD');
      },
      remainingValue(value) {
        return value - this.budget > 0 ? (value - this.budget).toLocaleString() : 'Achieved';
      },
      remainingDays(date) {
        const momentDate = moment(date);
        const remainingDays =  momentDate.diff(new Date(), 'days');
        return remainingDays > 0 ? `${remainingDays} days` : 'Deadline reached'
      },
      editGoal(key) {
        this.goalModalShow = true;
        this.selectedGoal = key;
        console.log(key);
      },
      openConfirmModal() {
        this.confirmModalShow = !this.confirmModalShow;
      },
      confirmDelete() {
        this.$store.dispatch('deleteGoal', this.selectedGoal);
        this.openConfirmModal();
      },
      openGoalModal() {
        this.goalModalShow = !this.goalModalShow;
      },
      deleteGoal(key) {
        console.log(key);
        this.openConfirmModal();
        this.selectedGoal = key;
      }
    }
  }
</script>

<style scoped lang="scss">
  .goals-row {
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