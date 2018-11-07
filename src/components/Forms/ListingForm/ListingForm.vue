<template>
  <div class="p-3 goal-form bg-white">
    <div class="d-flex justify-content-between">
      <h5 class="m-0">{{title}}</h5>
      <span class="close" @click="$emit('close')"><i class="material-icons">clear</i></span>
    </div>

    <hr>

    <div class="">
      <div class="form-group mr-2">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Name" v-model="listingData.name">
        <div v-if="nameError.error" class="text-danger">{{nameError.errorMsg}}</div>
      </div>
      <div class="form-group mr-2">
        <label for="bankName">Bank Name</label>
        <input type="text" class="form-control" id="bankName" placeholder="Bank Name" v-model="listingData.bankName">
        <div v-if="bankNameError.error" class="text-danger">{{bankNameError.errorMsg}}</div>
      </div>
      <div class="form-group mr-2">
        <label for="bankAccountNumber">Bank Account Number</label>
        <input type="text" class="form-control" id="bankAccountNumber" placeholder="Bank Account Number" v-model="listingData.bankAccountNumber">
        <div v-if="bankAccountNumberError.error" class="text-danger">{{bankAccountNumberError.errorMsg}}</div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-primary btn-block" @click="add">{{buttonText}}</button>
    </div>
  </div>
</template>

<script>
  import { validate } from "../../../utilities/validation";

  export default {
    name: "ListingForm",
    props: {
      keyString: {
        type: String,
        default: ''
      },
    },
    created() {
      if(this.keyString) {
        this.listingData = {...this.$store.getters.getListing(this.keyString)};
      }
    },
    data() {
      return {
        listingData: {
          name: '',
          bankName: '',
          bankAccountNumber: '',
        },
        nameError: {
          error: false,
          errorMsg: ''
        },
        bankNameError: {
          error: false,
          errorMsg: ''
        },
        bankAccountNumberError: {
          error: false,
          errorMsg: ''
        },
        title: this.keyString ? 'Edit Listing' : 'Add Listing',
        buttonText: this.keyString ? 'Edit' : 'Add',
      }
    },
    methods: {
      add() {
        this.nameError = validate(this.listingData.name, 'text');
        this.bankNameError = validate(this.listingData.bankName, 'text');
        this.bankAccountNumberError = validate(this.listingData.bankAccountNumber, 'text');

        const validData = !this.nameError.error && !this.bankNameError.error && !this.bankAccountNumberError.error;

        if(validData) {
          if(this.keyString) {
            this.$store.dispatch('editListing', this.listingData)
              .then(res => this.$emit('close'));
          } else {
           this.$store.dispatch('addListing', this.listingData)
             .then(res => this.$emit('close'));
          }
        }
      }
    },
  }
</script>

<style scoped>

</style>