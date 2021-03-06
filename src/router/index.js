import Vue from 'vue';
import VueRouter from 'vue-router';
import Members from '../views/Members.vue';
import Surveys from '../views/Surveys.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'members',
    component: Members
  },
  {
    path: '/surveys',
    name: 'surveys',
    component: Surveys
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
