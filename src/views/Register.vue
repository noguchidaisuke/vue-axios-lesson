<template>
  <div>
    <h3>登録</h3>
    <label for="email">Email:</label>
    <input
     type="email"
     id="email"
     v-model="email">
    <br />
    <label for="password">Password</label>
    <input
     type="text"
     id="password"
     v-model="password">
     <br>
    <button @click="register">登録</button>
  </div>
</template>

<script>
import axios from '../axios-auth';

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      axios.post('/accounts:signUp?key=AIzaSyDPRdkmbjZxpzVlXpw3kDBZcf_jO3omVVg',
      {email: this.email,
       password: this.password,
       returnSecureToken: true
      }
    ).then(response => console.log(response)).catch(error => console.log(error.response))
    }
  }
};
</script>