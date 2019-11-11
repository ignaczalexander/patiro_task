import Vue from 'vue';
import Vuex from 'vuex';
import members from './modules/members';
import surveys from './modules/surveys';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    members,
    surveys
  }
});
