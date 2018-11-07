<template>
  <div class="col-lg-4 mb-2">
    <div class="listing p-2">
      <div class="d-flex justify-content-between">
        <h3>{{listing.name}}</h3>
        <div>
          <i class="material-icons text-primary" @click="editListing">edit</i>
          <i class="material-icons text-danger" @click="deleteListing">close</i>
        </div>
      </div>
      <p>{{listing.bankName}}</p>
      <p>{{listing.bankAccountNumber}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Listing",
    props: {
      listing: {
        type: Object,
        required: true
      },
    },
    methods: {
      editListing() {
        this.$emit('editListing', this.listing.key);
      },
      deleteListing() {
        this.$emit('deleteListing', this.listing.key);
      }
    },
  }
</script>

<style scoped lang="scss">
  .listing {
    background-color: #f7f7f7;

    i {
      cursor: pointer;
      opacity: 0;
      transition: all .2s ease;
    }

    &:hover {
      i {
        opacity: 1;
      }
    }
  }
</style>