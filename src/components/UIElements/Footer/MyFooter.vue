<template>
  <footer class="footer">
  <div class="row center bg-primary">
    <div class="container center">
      <div class="col-md-12 text-center"><h5>{{ new Date().getFullYear() }} - <strong> Cashwise</strong></h5></div>
    </div>
  </div>
  </footer>
</template>

<script>
  export default {
    name: 'MyFooter'
  }
</script>

<style scoped>

  .container{
    padding-top: 10px;
  }

  .footer{
    color: white;
    position:fixed;
    bottom: 0px;
    width: 100vw;
  }

</style>
