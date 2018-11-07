<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="bg-white shadow my-5 p-3">
          <h3 class="text-dark text-center">Choose a Listing</h3>
          <div v-for="(listing, index) in listings"
               :key="index"
               class="listing p-2 mb-2"
               @click="goToListing(listing.key)">
            <h5 class="mb-0">{{listing.name}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Listings",
    computed: {
      listings() {
        return this.$store.getters.getListings;
      }
    },
    methods: {
      goToListing(key) {
        this.$router.push(`/dashboard/listings/${key}/budget`);
      }
    },
  }
</script>

<style scoped lang="scss">
  .listing {
    background-color: #f7f7f7;
    cursor: pointer;
    transition: all .2s ease;

    &:hover {
     background-color: #e4e4e4;
    }
  }
</style>