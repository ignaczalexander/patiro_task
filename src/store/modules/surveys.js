import axios from 'axios';
import utils from '../../utils';
const state = {
  surveys: []
};
const getters = {
  surveys: state => state.surveys
};
const actions = {
  async fetchSurveys({ commit }) {
    const response = await axios.get(
      'https://www.patiro.com/test/surveys.json'
    );
    console.log('surv', response.data);
    commit('setSurveys', response.data);
  },
  sortSurveys({ commit, state }, sortingParam) {
    let sortedSurveys = state.surveys;
    switch (sortingParam) {
      case 'nameAsc':
        sortedSurveys = utils.sortByString(sortedSurveys, 'name', 'asc');
        break;
      case 'nameDesc':
        sortedSurveys = utils.sortByString(sortedSurveys, 'name', 'desc');
        break;
      case 'idAsc':
        sortedSurveys = utils.sortByInt(sortedSurveys, 'id', 'asc');
        break;
      case 'idDesc':
        sortedSurveys = utils.sortByInt(sortedSurveys, 'id', 'desc');
        break;
      default:
        return;
    }
    commit('setSortedSurveys', sortedSurveys);
  }
};
const mutations = {
  setSurveys: (state, surveys) => {
    state.surveys = surveys;
  },
  setSortedSurveys: (state, sortedSurveys) => {
    state.surveys = sortedSurveys;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
