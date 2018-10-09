<template>
  <div class="mt-5">
    <h4 class="text-center text-primary mb-3">Planned Budgets</h4>
    <table class="table table-hover">
      <thead>
      <tr class="text-white bg-primary">
        <td>Budget</td>
        <td>Description</td>
        <td>Date</td>
        <td>Subscription</td>
        <td>Value</td>
        <td></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(plannedBudget, index) in plannedBudgets" :key="index" class="plannedBudgets-row">
        <td>{{plannedBudget.budget === '-' ? 'Expense' : 'Income'}}</td>
        <td>{{plannedBudget.description}}</td>
        <td>{{formatDate(plannedBudget.date)}}</td>
        <td v-if="plannedBudget.subscription">{{plannedBudget.subscription}}</td>
        <td v-else>-</td>
        <td>{{plannedBudget.budget}}{{plannedBudget.value}}</td>
        <td class="plannedBudgets-row__delete">
          <span class="text-primary mr-2">Edit</span>
          <span class="text-danger">Delete</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: "PlannedBudgetList",
    props: {
      plannedBudgets: {
        type: Array,
        default: []
      },
    },
    methods: {
      formatDate(date) {
        return moment(date).format('YYYY/MM/DD');
      }
    }
  }
</script>

<style scoped lang="scss">
  .plannedBudgets-row {
    &__delete {
      opacity: 0;
      transition: all .2s ease-in-out;
      cursor: pointer;
    }

    &:hover &__delete {
      opacity: 1;
      transform: translateX(-2px);
    }
  }
</style>