<template>
  <div v-if="show" class="alert alert-dismissible infobar mb-0 w-100" :class="infoBar.color">
    <button type="button" class="close" @click="close">&times;</button>
    <h4 class="alert-heading">{{infoBar.title}}</h4>
    <p>{{infoBar.text}}</p>
  </div>
</template>

<script>
  export default {
    name: "Infobar",
    computed: {
      infoBar() {
        return this.$store.getters.getInfoBar;
      },
      show() {
        return this.$store.getters.getInfoBarShow;
      }
    },
    methods: {
      close() {
        //this.show = false;
      }
    },
  }
</script>

<style scoped>
  .infobar {
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>