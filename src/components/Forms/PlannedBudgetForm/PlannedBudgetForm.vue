<template>
  <div class="p-3 planned-budget-form bg-white">
    <div class="d-flex justify-content-between">
      <h5 class="m-0">Add Planned Budget</h5>
      <span class="close" @click="$emit('close')"><i class="material-icons">clear</i></span>
    </div>

    <hr>

    <div class="">
      <div class="form-group">
        <div class="custom-control custom-radio">
          <input type="radio" id="one-tme" name="customRadio" class="custom-control-input" v-model="plannedBudget.oneTimeOnly" value="one">
          <label class="custom-control-label" for="one-tme">One-time budget</label>
        </div>
        <div class="custom-control custom-radio">
          <input type="radio" id="repeating" name="customRadio" class="custom-control-input" v-model="plannedBudget.oneTimeOnly" value="repeat">
          <label class="custom-control-label" for="repeating">Reapating budget</label>
        </div>
      </div>
      <div>
        <label>{{dateLabel}}</label>
        <datepicker class="date mr-3 mb-3" wrapper-class="datepicker w-100" input-class="w-100" placeholder="Date" v-model="plannedBudget.date"></datepicker>
      </div>
      <div class="form-group" v-if="plannedBudget.oneTimeOnly === 'repeat'">
        <label>Subscription time</label>
        <select class="custom-select expense form-control mr-3" v-model="plannedBudget.subscription">
          <option disabled>Choose a subscription time</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>
      <div class="form-group  mr-2">
        <label>Expense or Income</label>
        <select class="custom-select expense form-control mr-3" v-model="plannedBudget.budget">
          <option>-</option>
          <option>+</option>
        </select>
      </div>
      <div class="form-group  mr-2">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" placeholder="Description" v-model="plannedBudget.description">
      </div>
      <div class="form-group ">
        <label for="value">Value</label>
        <input type="number" class="form-control" id="value" placeholder="Value" v-model="plannedBudget.value">
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
    name: "PlannedBudgetForm",
    components: {Datepicker},
    props: {
      keyString: {
        type: String,
        default: ''
      },
      budgetType: {
        type: String,
        default: ''
      }
    },
    created() {
      if(this.keyString) {
        this.plannedBudget = {...this.$store.getters.getUserPlannedBudget(this.keyString)};
        if(this.plannedBudget.subscription) {
          this.plannedBudget.oneTimeOnly = 'repeat';
        } else {
        }
      }
    },
    data() {
      return {
        plannedBudget: {
          oneTimeOnly: 'one',
          budget: '-',
          description: '',
          value: '',
          category: 'Categories',
          date: new Date(),
          subscription: 'Choose a subscription time'
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
    computed: {
      dateLabel() {
        return this.plannedBudget.oneTimeOnly === 'one' ? 'Planned date' : 'Select start date';
      }
    },
    methods: {
      add() {
        this.descriptionError = validate(this.plannedBudget.description, 'text');
        this.valueError = validate(this.plannedBudget.value, 'number');
        if(!this.descriptionError.error && !this.valueError.error) {
          if(this.keyString ){
            if(this.plannedBudget.oneTimeOnly === 'repeat') {
              if(this.plannedBudget.subscription !== 'Choose a subscription time') {
                this.$store.dispatch('editPlannedBudget', this.plannedBudget)
                  .then(res => {

                    this.$emit('close');
                  });
              }
            } else {
              this.$store.dispatch('editPlannedBudget', this.plannedBudget)
                .then(res => {

                  this.$emit('close');
                });
            }
          } else {
            if(this.plannedBudget.oneTimeOnly === 'repeat') {
              if(this.plannedBudget.subscription !== 'Choose a subscription time') {
                this.$store.dispatch('addPlannedBudget', this.plannedBudget)
                  .then(res => {
                    this.$emit('close');
                  });
              }
            } else {
              this.$store.dispatch('addPlannedBudget', this.plannedBudget)
                .then(res => {
                  this.$emit('close');
                });
            }
          }
        } else {
          console.log('error');
        }
      }
    },
  }
</script>

<style lang="scss">
  .planned-budget-form {
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