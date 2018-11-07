<template>
  <modal :show="show" @close="$emit('close')">
    <planned-budget-form @close="$emit('close')" :keyString="keyString"></planned-budget-form>
  </modal>
</template>

<script>
  import Modal from "../../UIElements/Modal/Modal";
  import PlannedBudgetForm from "../../Forms/PlannedBudgetForm/PlannedBudgetForm";
  export default {
    name: "PlannedBudgetModal",
    components: {PlannedBudgetForm, Modal},
    props: {
      show: {
        type: Boolean,
        default: false
      },
      keyString: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>

</style>