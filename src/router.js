import Vue from 'vue';
import VueRouter from 'vue-router';
import Comments from './views/Comments';
import Login from './views/Login';
import Register from './views/Register';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Comments },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
});