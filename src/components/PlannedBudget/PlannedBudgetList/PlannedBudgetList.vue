<template>
  <div class="mt-5">
    <h4 class="text-center text-primary mb-3">Planned Budgets</h4>
    <table class="table table-hover">
      <thead>
      <tr class="text-white bg-primary">
        <td>Budget</td>
        <td>Description</td>
        <td>Date</td>
        <td>Subscription</td>
        <td>Value</td>
        <td></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(plannedBudget, index) in plannedBudgets" :key="index" class="plannedBudgets-row">
        <td>{{plannedBudget.budget === '-' ? 'Expense' : 'Income'}}</td>
        <td>{{plannedBudget.description}}</td>
        <td>{{formatDate(plannedBudget.date)}}</td>
        <td v-if="plannedBudget.subscription">{{plannedBudget.subscription}}</td>
        <td v-else>-</td>
        <td>{{plannedBudget.budget}}{{plannedBudget.value}}</td>
        <td class="plannedBudgets-row__delete">
          <span class="text-primary mr-2" @click="editPlannedBudget(plannedBudget.key)">Edit</span>
          <span class="text-danger" @click="deletePlannedBudget(plannedBudget.key)">Delete</span>
        </td>
      </tr>
      </tbody>
    </table>
    <confirm-modal :show="confirmModalShow" @close="openConfirmModal" title="Do you want to delete this planned budget?"
                   cancel-text="Cancel"
                   confirm-text="Delete"
                   text="This planned budget will be deleted from your account"
                   @confirm="confirmDelete"></confirm-modal>
    <planned-budget-modal :show="plannedBudgetModalShow" :keyString="selectedPlannedBudget" @close="openPlannedBudgetModal"></planned-budget-modal>
  </div>
</template>

<script>
  import moment from 'moment';
  import PlannedBudgetModal from "../PlannedBudgetModal/PlannedBudgetModal";
  import ConfirmModal from "../../UIElements/ConfirmModal/ConfirmModal";

  export default {
    name: "PlannedBudgetList",
    components: {ConfirmModal, PlannedBudgetModal},
    props: {
      plannedBudgets: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        plannedBudgetModalShow: false,
        selectedPlannedBudget: '',
        confirmModalShow: false
      }
    },
    methods: {
      formatDate(date) {
        return moment(date).format('YYYY/MM/DD');
      },
      editPlannedBudget(key) {
        this.plannedBudgetModalShow = true;
        this.selectedPlannedBudget = key;
      },
      openPlannedBudgetModal() {
        this.plannedBudgetModalShow = !this.plannedBudgetModalShow;
      },
      deletePlannedBudget(key) {
        this.confirmModalShow = true;
        this.selectedPlannedBudget = key;
      },
      openConfirmModal() {
        this.confirmModalShow = !this.confirmModalShow;
      },
      confirmDelete() {
        this.$store.dispatch('deletePlannedBudget', this.selectedPlannedBudget);
        this.openConfirmModal();
      }
    }
  }
</script>

<style scoped lang="scss">
  .plannedBudgets-row {
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