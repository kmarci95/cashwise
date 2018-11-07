<template>
  <modal :show="show" @close="$emit('close')">
    <listing-form @close="$emit('close')" :key-string="keyString"></listing-form>
  </modal>
</template>

<script>
  import Modal from "../../../UIElements/Modal/Modal";
  import ListingForm from "../../../Forms/ListingForm/ListingForm";
  export default {
    name: "AccountListingModal",
    components: {ListingForm, Modal},
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