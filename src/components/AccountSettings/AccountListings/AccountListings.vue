<template>
  <div class="p-3">
    <h4 class="mb-4">Your Listings</h4>
    <button class="btn btn-primary" @click="toggleModal">Add Listing</button>
    <div class="row mt-3">
      <listing v-for="(listing, index) in listings"
               :key="index"
               :listing="listing"
               @editListing="editListing"
               @deleteListing="deleteListing">
      </listing>
    </div>
    <account-listing-modal :show="accountListingModalShow" :keyString="activeListing" @close="toggleModal"></account-listing-modal>
    <confirm-modal :show="confirmModalShow"
                   @close="openConfirmModal"
                   title="Do you want to delete this listing?"
                   cancel-text="Cancel"
                   confirm-text="Delete"
                   text="This listing will be deleted from your account"
                   @confirm="confirmDelete"
    ></confirm-modal>
  </div>
</template>

<script>
  import AccountListingModal from "./AccountListingModal/AccountListingModal";
  import Listing from "./Listing/Listing";
  import ConfirmModal from "../../UIElements/ConfirmModal/ConfirmModal";
  export default {
    name: "AccountListings",
    components: {ConfirmModal, Listing, AccountListingModal},
    data() {
      return {
        accountListingModalShow: false,
        activeListing: '',
        confirmModalShow: false
      }
    },
    computed: {
      listings() {
        return this.$store.getters.getListings;
      }
    },
    methods: {
      toggleModal() {
        this.accountListingModalShow = !this.accountListingModalShow;
      },
      editListing(key) {
        this.activeListing = key;
        this.accountListingModalShow = true;
      },
      openConfirmModal() {
        this.confirmModalShow = !this.confirmModalShow;
      },
      deleteListing(key) {
        this.openConfirmModal();
        this.activeListing = key;
      },
      confirmDelete() {
        this.$store.dispatch('deleteListing', this.activeListing);
        this.openConfirmModal();
      }
    },
  }
</script>

<style scoped>

</style>