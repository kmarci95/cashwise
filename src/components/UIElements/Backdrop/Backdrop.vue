<template>
  <div class="backdrop">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Backdrop",
    data() {
      return {
        show: true
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    },
  }
</script>

<style scoped>
  .backdrop {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.3);
  }

</style>