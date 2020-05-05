<template>
  <div>
    <h3>ログインする</h3>
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
    <button @click="login">ログイン</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      });
      this.email = "";
      this.password = "";
    }
  }
};
</script>