<template>
  <div class="mt-5">
    <h4 class="text-center text-primary mb-3">Goals</h4>
    <table class="table table-hover">
      <thead>
      <tr class="text-white bg-primary">
        <td>Description</td>
        <td>Deadline</td>
        <td>Value</td>
        <td>Remaining Money</td>
        <td>Remaining Days</td>
        <td></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(goal, index) in goals" :key="index" class="goals-row">
        <td>{{goal.description}}</td>
        <td>{{formatDate(goal.date)}}</td>
        <td>{{parseFloat(goal.value).toLocaleString()}}</td>
        <td>{{remainingValue(goal.value)}}</td>
        <td>{{remainingDays(goal.date)}}</td>
        <td class="goals-row__delete">
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
    name: "GoalList",
    props: {
      goals: {
        type: Array,
        default: []
      },
    },
    computed: {
      budget() {
        return this.$store.getters.getIncome - this.$store.getters.getExpenses;
      }
    },
    methods: {
      formatDate(date) {
        return moment(date).format('YYYY/MM/DD');
      },
      remainingValue(value) {
        return value - this.budget > 0 ? (value - this.budget).toLocaleString() : 'Achieved';
      },
      remainingDays(date) {
        const momentDate = moment(date);
        const remainingDays =  momentDate.diff(new Date(), 'days');
        return remainingDays > 0 ? `${remainingDays} days` : 'Deadline reached'
      }
    }
  }
</script>

<style scoped lang="scss">
  .goals-row {
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