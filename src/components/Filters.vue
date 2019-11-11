<template>
  <div class="filters-container">
    <div class="age-selector">
      <div class="filter-title">Age</div>
      <vue-slider
        :min="minAge"
        :max="maxAge"
        @drag-end="onChangeFilter"
        v-model="age"
        :enable-cross="false"
        :lazy="true"
        :contained="true"
      ></vue-slider>
      <div class="age-values">
        <div>{{age[0]}} - {{age[1]}}</div>
      </div>
    </div>
    <div class="filter-title">Gender</div>
    <div class="gender-filter">
      <span class="gender-item">
        <input @change="onChangeFilter" type="checkbox" id="male-box" v-model="maleChecked" />
        <label for="male-box">Male</label>
      </span>
      <span class="gender-item">
        <input @change="onChangeFilter" type="checkbox" id="female-box" v-model="femaleChecked" />
        <label for="female-box">Female</label>
      </span>
    </div>
    <div class="filter-title">Country</div>
    <div class="countries-filter">
      <label :key="country" v-for="country in possibleCountries">
        <input
          @change="onChangeFilter"
          type="checkbox"
          :id="country"
          :value="country"
          v-model="checkedCountries"
        />
        {{country}}
      </label>
    </div>
    <div class="sort-container">
      <select @change="onChangeSort" v-model="sortBy">
        <option disabled value>Sorty by</option>
        <option value="nameAsc">Name 0-Z</option>
        <option value="nameDesc">Name Z-0</option>
        <option value="ageAsc">Age Low-High</option>
        <option value="ageDesc">Age High-Low</option>
      </select>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Filters",
  components: {
    VueSlider
  },
  data: () => ({
    maleChecked: false,
    femaleChecked: false,
    checkedCountries: [],
    ageProxy: null,
    sortBy: ""
  }),
  props: ["members"],
  methods: {
    ...mapActions(["filterMembers", "sortMembers"]),
    onChangeFilter() {
      this.filterMembers({
        countries: this.checkedCountries,
        male: this.maleChecked,
        female: this.femaleChecked,
        minAge: this.age[0],
        maxAge: this.age[1],
        sortBy: this.sortBy
      });
      if (this.sortBy) {
        this.sortMembers(this.sortBy);
      }
    },
    onChangeSort() {
      this.sortMembers(this.sortBy);
    }
  },
  computed: {
    ...mapGetters(["minAge", "maxAge"]),
    possibleCountries() {
      const countries = [];
      this.members.map(member => {
        if (member.country && !countries.includes(member.country.name)) {
          countries.push(member.country.name);
        }
      });
      return countries.sort();
    },
    age: {
      get() {
        return this.ageProxy ? this.ageProxy : [this.minAge, this.maxAge];
      },
      set(val) {
        this.ageProxy = val;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.filters-container {
  padding: 0.5rem;
}
.filter-title {
  font-weight: 700;
}
.age-selector {
  margin-bottom: 1rem;
  .age-values {
    display: flex;
    justify-content: space-between;
  }
  .vue-slider .vue-slider-process {
    background-color: $primary_color;
  }
}
.gender-filter {
  margin-bottom: 1rem;
}
.gender-item:first-child {
  margin-right: 1rem;
}
.countries-filter {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  label {
    margin-right: 1.25rem;
  }
}
.sort-container {
  display: flex;
  justify-content: flex-end;
}
.raiiiil {
  background-color: red;
}
</style>