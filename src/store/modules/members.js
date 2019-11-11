import axios from 'axios';
import constants from '../../constants';
import utils from '../../utils';
const state = {
  members: [],
  filteredMembers: [],
  selectedMember: {
    info: {},
    surveyResponses: []
  }
};
const getters = {
  members: state => state.members,
  filteredMembers: state => state.filteredMembers,
  currentMember: state => state.selectedMember,
  maxAge: state => {
    if (!state.members.length) {
      return 99;
    }
    return Math.max(
      ...state.members
        .filter(member => member.age)
        .map(function(member) {
          return member.age;
        })
    );
  },
  minAge: state => {
    if (!state.members.length) {
      return 0;
    }
    return Math.min(
      ...state.members
        .filter(member => member.age)
        .map(function(member) {
          return member.age;
        })
    );
  }
};
const actions = {
  async fetchMembers({ commit }) {
    const response = await axios.get('https://www.patiro.com/test/member.json');
    commit('setMembers', response.data.members);
    commit('setFilteredMembers', response.data.members);
  },
  async getMember({ commit }, id) {
    if (constants.allowedUserIds.includes(id.toString())) {
      try {
        const response = await axios.get(
          `https://www.patiro.com/test/${id}.json`
        );
        commit('setCurrentMember', response.data.member);
        commit('setCurrentMemberResponses', response.data.surveyResponses);
      } catch (error) {
        commit('setCurrentMember', {});
      }
    } else {
      commit('setCurrentMember', {});
    }
  },
  sortMembers({ commit, state }, sortingProp) {
    let sortedMembers = state.filteredMembers;
    switch (sortingProp) {
      case 'nameAsc':
        sortedMembers = utils.sortByString(sortedMembers, 'fullName', 'asc');
        break;
      case 'nameDesc':
        sortedMembers = utils.sortByString(sortedMembers, 'fullName', 'desc');
        break;
      case 'ageAsc':
        sortedMembers = utils.sortByInt(sortedMembers, 'age', 'asc');
        break;
      case 'ageDesc':
        sortedMembers = utils.sortByInt(sortedMembers, 'age', 'desc');
        break;
      default:
        return;
    }
    commit('setSortedMembers', sortedMembers);
  },
  filterMembers({ commit, state, getters }, filtersData) {
    const maxAge = getters.maxAge;
    const minAge = getters.minAge;
    let filteredMembers = state.members;
    if (filtersData.countries.length) {
      filteredMembers = filteredMembers.filter(member => {
        if (!member.country) return false;
        return filtersData.countries.includes(member.country.name);
      });
    }
    if (filtersData.male || filtersData.female) {
      filteredMembers = filteredMembers.filter(member => {
        if (!member.gender) return false;
        if (filtersData.male && filtersData.female) {
          return true;
        }
        if (filtersData.male) {
          return member.gender.id === 1;
        }
        if (filtersData.female) {
          return member.gender.id === 2;
        }
      });
    }
    if (filtersData.minAge !== minAge || filtersData.maxAge !== maxAge) {
      filteredMembers = filteredMembers.filter(member => {
        if (!member.age) {
          return false;
        }
        return (
          member.age <= filtersData.maxAge && member.age >= filtersData.minAge
        );
      });
    }
    commit('setFilteredMembers', filteredMembers);
  }
};
const mutations = {
  setMembers: (state, members) => {
    state.members = members;
  },
  setFilteredMembers: (state, filteredMembers) => {
    state.filteredMembers = filteredMembers;
  },
  setSortedMembers: (state, sortedMembers) => {
    state.filteredMembers = sortedMembers;
  },
  setCurrentMember: (state, member) => {
    state.selectedMember.info = member;
  },
  setCurrentMemberResponses: (state, response) => {
    state.selectedMember.surveyResponses = response;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
