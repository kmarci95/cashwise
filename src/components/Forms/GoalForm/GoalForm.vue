<template>
  <div class="p-3 goal-form bg-white">
    <div class="d-flex justify-content-between">
      <h5 class="m-0">Add Goal</h5>
      <span class="close" @click="$emit('close')"><i class="material-icons">clear</i></span>
    </div>

    <hr>

    <div class="">
      <div class="form-group mr-2">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" placeholder="Description" v-model="goal.description">
      </div>
      <div class="form-group mr-2">
        <label for="value">Value</label>
        <input type="number" class="form-control" id="value" placeholder="Value" v-model="goal.value">
      </div>
      <div>
        <label>Deadline</label>
        <datepicker class="date mr-3 mb-3" wrapper-class="datepicker w-100" input-class="w-100" placeholder="Date"
                    v-model="goal.date"></datepicker>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-primary btn-block" @click="add">Add</button>
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
    props: {
      keyString: {
        type: String,
        default: ''
      },
    },
    created() {
      if(this.keyString) {
        this.goal = {...this.$store.getters.getUserGoal(this.keyString)};
      }
    },
    data() {
      return {
        goal: {
          description: '',
          value: '',
          date: new Date()
        },
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
        this.descriptionError = validate(this.goal.description, 'text');
        this.valueError = validate(this.goal.value, 'number');
        if(!this.descriptionError.error && !this.valueError.error) {
          if(this.keyString) {
            this.$store.dispatch('editGoal', this.goal);
            this.$emit('close');
          } else {
            this.$store.dispatch('addGoal', this.goal)
              .then(res => {
                this.$emit('close');
              });
          }
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