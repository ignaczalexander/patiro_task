<template>
  <div class="container">
    <h1>Surveys</h1>
    <div class="sort-container">
      <select @change="onChangeSort" v-model="sortBy">
        <option disabled value>Sorty by</option>
        <option value="nameAsc">Name A-Z</option>
        <option value="nameDesc">Name Z-A</option>
        <option value="idAsc">ID Low-High</option>
        <option value="idDesc">ID High-Low</option>
      </select>
    </div>
    <ul v-for="surv in surveys" :key="surv.id">
      <li class="survey-item">
        <span>{{surv.name}}</span>
        <span>{{surv.id}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Surveys",
  data() {
    return {
      sortBy: ""
    };
  },
  computed: mapGetters(["surveys"]),

  methods: {
    ...mapActions(["fetchSurveys", "sortSurveys"]),
    onChangeSort() {
      this.sortSurveys(this.sortBy);
    }
  },
  created() {
    this.fetchSurveys();
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1.5rem;
  max-width: $max_width;
  margin: auto;
}
h1 {
  margin-top: 0;
  font-size: 1.5rem;
}
.sort-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.survey-item {
  padding: 1rem;
  border-radius: 3px;
  background-color: $bg_light_gray;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
}
</style>