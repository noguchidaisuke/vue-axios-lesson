import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth'
import router from '../router'
import axiosRefresh from '../axios-refresh'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null
  },
  getters: {
    idToken: state => state.idToken
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    }
  },
  actions: {
    login({commit, dispatch}, authData) {
      axios.post('/accounts:signInWithPassword?key=AIzaSyDPRdkmbjZxpzVlXpw3kDBZcf_jO3omVVg',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
      .then(response => {
        commit('updateIdToken', response.data.idToken)
        console.log("Login Success!")
        setTimeout(() => {
          dispatch('refreshIdToken', response.data.refreshToken)
        }, response.data.expiresIn * 1000)
        router.push('/')
      })
    },
    refreshIdToken({commit, dispatch}, refreshToken){
      axiosRefresh.post('token?key=AIzaSyDPRdkmbjZxpzVlXpw3kDBZcf_jO3omVVg'
        ,{
          grant_type: "refresh_token",
          refresh_token: refreshToken
        }
      ).then(response => {
        commit("updateIdToken", response.data.id_token)
        setTimeout(() => {
          dispatch('refreshIdToken', response.data.refresh_token);
        }, response.data.expires_in * 1000)
      })
    },
    register(context, authData) {
      axios.post('/accounts:signUp?key=AIzaSyDPRdkmbjZxpzVlXpw3kDBZcf_jO3omVVg',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(response => {
        context.commit('updateIdToken', response.data.idToken)
        router.push('/')
      })
    }
  }
})