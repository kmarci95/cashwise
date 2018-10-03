<template>
  <div class="border p-3 goal-form">
    <div class="bg-primary d-inline-block p-2 text-white planned-budget-form__banner">
      My Goal
    </div>
    <div class="d-flex justify-content-between">
      <div class="form-group w-100 mr-2">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" placeholder="Description" v-model="description">
      </div>
      <div class="form-group w-100 mr-2">
        <label for="value">Value</label>
        <input type="number" class="form-control" id="value" placeholder="Value" v-model="value">
      </div>
      <div class="w-100">
        <label>Deadline</label>
        <datepicker class="date mr-3 mb-3" wrapper-class="datepicker w-100" input-class="w-100" placeholder="Date"
                    v-model="date"></datepicker>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-primary" @click="add">Add</button>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import {validate} from '../../../utilities/validation';

  export default {
    name: "GoalForm",
    components: {
      Datepicker
    },
    data() {
      return {
        description: '',
        value: '',
        date: new Date(),
        descriptionError: {
          descriptionMsg: '',
          error: false
        },
        valueError: {
          valueMsg: '',
          error: false
        },
        dateError: {
          dateMsg: '',
          error: false
        },
      }
    },
    methods: {
      add() {
        this.descriptionError = validate(this.description, 'text');
        this.valueError = validate(this.value, 'number');
        if(!this.descriptionError.error && !this.valueError.error) {
          const goal = {
            description: this.description,
            value: this.value,
            date: this.date
          };
          this.$store.dispatch('addGoal', goal)
            .then(res => {
              this.description = '';
              this.value = '';
              this.date = new Date();
              this.$store.dispatch('displayInfoBar', {color: 'alert-success', title: `Goal Addded`, text: ''})
            });
        } else {
          console.log('error');
        }
      }
    },
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