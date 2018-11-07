<template>
  <modal :show="show" @close="$emit('close')">
    <goal-form @close="$emit('close')" :key-string="keyString"></goal-form>
  </modal>
</template>

<script>
  import Modal from "../../UIElements/Modal/Modal.vue";
  import GoalForm from "../../Forms/GoalForm/GoalForm.vue";
  export default {
    name: "GoalModal",
    components: {GoalForm, Modal},
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