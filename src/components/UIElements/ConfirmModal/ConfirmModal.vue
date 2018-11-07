<template>
  <modal :show="show">
    <div class="bg-white p-3">
      <div class="mb-3">
        <h3 class="">{{title}}</h3>
      </div>
      <div class="mb-3">
        <p class="">{{text}}</p>
      </div>
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-light mr-2" @click="$emit('close')">{{cancelText}}</button>
        <button class="btn btn-danger" @click="$emit('confirm')">{{confirmText}}</button>
      </div>
    </div>
  </modal>
</template>

<script>
  import Modal from "../Modal/Modal.vue";
  export default {
    name: "ConfirmModal",
    components: {Modal},
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: ''
      },
      confirmText: {
        type: String,
        default: ''
      }
    },
  }
</script>

<style scoped>

</style>