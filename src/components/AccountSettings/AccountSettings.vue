<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="bg-white shadow my-5 py-3">
          <h3 class="text-center">Account Settings</h3>
          <account-information></account-information>
          <account-categories></account-categories>
          <account-listings></account-listings>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AccountInformation from "./AccountInformation/AccountInformation.vue";
  import AccountCategories from "./AccountCategories/AccountCategories.vue";
  import AccountListings from "./AccountListings/AccountListings";

  export default {
    name: "AccountSettings",
    components: {AccountListings, AccountCategories, AccountInformation}
  }
</script>

<style scoped lang="scss">

</style>