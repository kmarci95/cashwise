<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="bg-white shadow mt-5 py-3">
          <h3 class="text-center">Account Settings</h3>

          <account-information></account-information>

          <account-categories></account-categories>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AccountInformation from "./AccountInformation/AccountInformation.vue";
  import AccountCategories from "./AccountCategories/AccountCategories.vue";

  export default {
    name: "AccountSettings",
    components: {AccountCategories, AccountInformation}
  }
</script>

<style scoped lang="scss">

</style>