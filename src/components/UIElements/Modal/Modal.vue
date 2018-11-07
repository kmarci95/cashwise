<template>
  <backdrop v-if="show" @click.native="$emit('close')">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <transition name="fade" appear>
          <div @click.stop="" :class="size">
            <slot></slot>
          </div>
        </transition>
      </div>
    </div>
  </backdrop>
</template>

<script>
  import Backdrop from "../Backdrop/Backdrop.vue";

  export default {
    name: "Modal",
    components: {Backdrop},
    props: {
      show: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'col-lg-6'
      },
    }
  }
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }

  .fade-enter, .fade-leave-to {
    transform: translateY(-10%);
  }
</style>