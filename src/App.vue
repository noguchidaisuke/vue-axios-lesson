<template>
  <div id="app">
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム</label>
    <input
     type="text"
     id="name"
     v-model="name">
    <br />
    <label for="comment">コメントエリア</label>
    <textarea id="comment" v-model="comment"></textarea>
    <button @click="createComment">コメントをサーバーに送る</button>
    <h2>掲示板</h2>
    <div v-for="post in posts" v-bind:key="post.name">
      <div>名前: {{post.fields.name.stringValue}}</div>
      <div>コメント: {{post.fields.comment.stringValue}}</div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from "./axios-auth";
export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: []
    };
  },
  created(){
    axios.get('/comments')
    .then((response) => {
      this.posts = response.data.documents
    }).catch((err) => {
      console.log(err)
    });
  },
  methods: {
    createComment(){
      axios.post('https://firestore.googleapis.com/v1/projects/vuejs-http-f7067/databases/(default)/documents/comments',
        {
          fields: {
            name: {
              stringValue:  this.name
            },
            comment: {
              stringValue:  this.comment
            }
          }
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
