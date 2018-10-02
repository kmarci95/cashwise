<template>
  <div class="border p-3 goal-form">
    <div class="bg-primary d-inline-block p-2 text-white planned-budget-form__banner">
      My Goal
    </div>

    <button class="btn btn-outline-primary btn-block" @click="">Add</button>
  </div>
</template>

<script>
  export default {
    name: "GoalForm"
  }
</script>

<style scoped lang="scss">
  .goal-form {
    &__banner {
      transform: translateY(-2rem);
    }

    .datepicker {
      div:first-child {
        height: 100%;
        display: flex;
      }

      input {
        border: 1px solid #ced4da;
        padding: 6px 12px;

        &::placeholder {
          color: #7e868e;
        }
      }
    }
  }
</style>