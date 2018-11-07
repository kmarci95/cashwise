<template>
  <div class="row">
    <template v-if="incomes.length && expenses.length">
      <div class="col-lg-6">
        <budget-list-item budget="income" :array="incomes" @deleteItem="deleteBudget" @editItem="editBudget"></budget-list-item>
      </div>
      <div class="col-lg-6">
        <budget-list-item budget="expenses" :array="expenses" @deleteItem="deleteBudget" @editItem="editBudget"></budget-list-item>
      </div>
    </template>
    <div class="col-lg-12 mt-5" v-else>
      <h4 class="text-center">No incomes or Expenses</h4>
    </div>
    <confirm-modal :show="confirmModalShow"
                   @close="openConfirmModal"
                   title="Do you want to delete this income?"
                   cancel-text="Cancel"
                   confirm-text="Delete"
                   text="This income will be deleted from your account"
                   @confirm="confirmDelete"
    ></confirm-modal>
    <budget-control-modal title="Add Budget" :show="budgetControlModalShow" @close="openBudgetControlModal" :keyString="selectedBudget" :budgetType="selectedBudgetType"></budget-control-modal>
  </div>
</template>

<script>
  import BudgetListItem from "./BudgetListItem/BudgetListItem.vue";
  import ConfirmModal from "../../UIElements/ConfirmModal/ConfirmModal.vue";
  import BudgetControlModal from "../BudgetControlModal/BudgetControlModal.vue";

  export default {
    components: {BudgetControlModal, ConfirmModal, BudgetListItem},
    data() {
      return {
        confirmModalShow: false,
        budgetControlModalShow: false,
        selectedBudget: '',
        selectedBudgetType: '',
      }
    },
    computed: {
      incomes() {
        return this.$store.getters.getUserIncomes;
      },
      expenses() {
        return this.$store.getters.getUserExpenses;
      }
    },
    methods: {
      openConfirmModal() {
        this.confirmModalShow = !this.confirmModalShow;
      },
      deleteIncome(key) {
        this.confirmModalShow = true;
        this.selectedBudget = key;
      },
      deleteBudget(key, isIncome) {
        this.openConfirmModal();
        this.selectedBudget = key;
        this.selectedBudgetType = isIncome === true ? 'income' : 'expense'
      },
      confirmDelete() {
        this.openConfirmModal();
        if(this.selectedBudgetType === 'income') {
          this.$store.dispatch('deleteIncome', this.selectedBudget);
        } else {
          this.$store.dispatch('deleteExpense', this.selectedBudget);
        }
      },
      openBudgetControlModal() {
        this.budgetControlModalShow = !this.budgetControlModalShow;
      },
      editBudget({key, isIncome}) {
        this.budgetControlModalShow = true;
        this.selectedBudget = key;
        this.selectedBudgetType = isIncome === true ? 'income' : 'expense';
      }
    },
}
</script>

<style scoped>

</style>