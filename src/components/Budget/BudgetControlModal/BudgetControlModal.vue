<template>
  <modal :show="show" @close="$emit('close')">
    <budget-control @close="$emit('close')" :keyString="keyString" :budgetType="budgetType"></budget-control>
  </modal>
</template>

<script>
  import Modal from "../../UIElements/Modal/Modal.vue";
  import BudgetControl from "../BudgetControl/BudgetControl.vue";
  export default {
    name: "BudgetControlModal",
    components: {BudgetControl, Modal},
    props: {
      show: {
        type: Boolean,
        default: false
      },
      keyString: {
        type: String,
        default: ''
      },
      budgetType: {
        type: String,
        default: 'income'
      }
    }
  }
</script>

<style scoped>

</style>