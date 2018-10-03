<template>
  <div class="border p-3 planned-budget-form">
    <div class="bg-primary d-inline-block p-2 text-white planned-budget-form__banner">
      My Planned Budget
    </div>
    <div class="d-flex justify-content-between">
      <div class="form-group w-100 mr-2">
        <label>Expense or Income</label>
        <select class="custom-select expense form-control mr-3" v-model="amplitude">
          <option>-</option>
          <option>+</option>
        </select>
      </div>
      <div class="form-group w-100 mr-2">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description" placeholder="Description" v-model="description">
      </div>
      <div class="form-group w-100">
        <label for="value">Value</label>
        <input type="number" class="form-control" id="value" placeholder="Value" v-model="value">
      </div>
    </div>
    <div class="form-group">
      <div class="custom-control custom-radio">
        <input type="radio" id="one-tme" name="customRadio" class="custom-control-input" v-model="oneTimeOnly" value="one">
        <label class="custom-control-label" for="one-tme">One-time budget</label>
      </div>
      <div class="custom-control custom-radio">
        <input type="radio" id="repeating" name="customRadio" class="custom-control-input" v-model="oneTimeOnly" value="repeat">
        <label class="custom-control-label" for="repeating">Reapating budget</label>
      </div>
    </div>
    <div>
      <label>{{dateLabel}}</label>
      <datepicker class="date mr-3 mb-3" wrapper-class="datepicker w-100" input-class="w-100" placeholder="Date" v-model="date"></datepicker>
    </div>
    <div class="form-group" v-if="oneTimeOnly === 'repeat'">
      <label>Subscription time</label>
      <select class="custom-select expense form-control mr-3" v-model="subscription">
        <option disabled>Choose a subscription time</option>
        <option>Daily</option>
        <option>Weekly</option>
        <option>Monthly</option>
        <option>Yearly</option>
      </select>
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
    name: "PlannedBudgetForm",
    components: {Datepicker},
    data() {
      return {
        oneTimeOnly: 'one',
        amplitude: '-',
        description: '',
        value: '',
        category: 'Categories',
        date: new Date(),
        subscription: 'Choose a subscription time',
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
        return this.oneTimeOnly === 'one' ? 'Planned date' : 'Select start date';
      }
    },
    methods: {
      add() {
        this.descriptionError = validate(this.description, 'text');
        this.valueError = validate(this.value, 'number');
        if(!this.descriptionError.error && !this.valueError.error) {
          if(this.oneTimeOnly === 'repeat') {
            if(this.subscription !== 'Choose a subscription time') {
              const newPlanned = {
                budget: this.amplitude,
                description: this.description,
                value: this.value,
                subscription: this.subscription,
                date: this.date
              };
              this.$store.dispatch('addPlannedBudget', newPlanned)
                .then(res => {
                  this.$store.dispatch('displayInfoBar', {color: 'alert-success', title: `Planned Budget Addded`, text: ''});
                  this.description = '';
                  this.value = '';
                  this.date = new Date();
                  this.oneTimeOnly = 'one';
                  this.amplitude = '-';
                  this.subscription = 'Choose a subscription time';
                });
            }
          } else {
            const newPlanned = {
              budget: this.amplitude,
              description: this.description,
              value: this.value,
              date: this.date
            };
            this.$store.dispatch('addPlannedBudget', newPlanned)
              .then(res => {
                this.$store.dispatch('displayInfoBar', {color: 'alert-success', title: `Planned Budget Addded`, text: ''});
                this.description = '';
                this.value = '';
                this.date = new Date();
                this.oneTimeOnly = 'one';
                this.amplitude = '-';
                this.subscription = 'Choose a subscription time';
              });
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