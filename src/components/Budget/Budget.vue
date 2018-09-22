<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 ">
        <div class="bg-white shadow mt-5 py-3">
          <div v-if="loading">
            <h2>Loading</h2>
          </div>
          <div v-else>
            <budget-header></budget-header>
            <div class="add mt-5 d-flex justify-content-center">
              <div class="d-flex justify-content-center w-75 p-2">
                <select class="form-control mr-3" id="exampleSelect1">
                  <option>+</option>
                  <option>-</option>
                </select>
                <input type="email" class="form-control mr-3" placeholder="Add Description">
                <input type="email" class="form-control mr-3" placeholder="Value">
                <datepicker class="mr-3" wrapper-class="datepicker" input-class="px-2" placeholder="Date"></datepicker>
                <button class="btn btn-primary" @click="add">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import axios from 'axios';
  import BudgetHeader from "./BudgetHeader/BudgetHeader.vue";

  export default {
    name: "Budget",
    components: {
      BudgetHeader,
      Datepicker
    },
    computed: {
      loading() {
        return this.$store.getters.getUserLoading;
      }
    },
    methods: {
      add() {
        axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${this.$store.getters.getUser.key}/incomes.json`, {
          value: '344000'
        })
      }
    },
  }
</script>

<style lang="scss">
  .add {
    background-color: #e2e6ea;
  }

  .datepicker {
    div:first-child {
      height: 100%;
      display: flex;
    }

    input {
      border: 1px solid #ced4da;
    }
  }
</style>