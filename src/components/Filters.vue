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
      <div class="gender-item">
        <label class="checkbox-container">
          <input @change="onChangeFilter" type="checkbox" id="male-box" v-model="maleChecked" />
          Male
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="gender-item">
        <label class="checkbox-container">
          <input @change="onChangeFilter" type="checkbox" id="female-box" v-model="femaleChecked" />
          Female
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
    <div class="filter-title">Country</div>
    <div class="countries-filter">
      <label class="checkbox-container" :key="country" v-for="country in possibleCountries">
        <input
          @change="onChangeFilter"
          type="checkbox"
          :id="country"
          :value="country"
          v-model="checkedCountries"
        />
        {{country}}
        <span class="checkmark"></span>
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
  margin-bottom: 0.25rem;
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
  display: flex;
}
.gender-item:first-child {
  margin-right: 1.5rem;
}
.countries-filter {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  // label {
  //   margin-right: 1.25rem;
  // }
}
.sort-container {
  display: flex;
  justify-content: flex-end;
}
.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 17px;
  width: 17px;
  background-color: $bg_light_gray;
}

// .checkbox-container:hover input ~ .checkmark {
//   background-color: $bg_light_gray;
// }

.checkbox-container input:checked ~ .checkmark {
  background-color: $primary_color;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>