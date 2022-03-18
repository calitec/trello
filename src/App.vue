<template>
  <div id="app">
    <Navbar />
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "app",
  components: { Navbar },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/vars.scss";

html,
body,
#app {
  height: 100%;
  margin: 0px;
}
#app {
  display: flex;
  flex-direction: column;
}
h1,
h2,
h3,
p,
span {
  color: #172b4d;
}
.container {
  flex-grow: 1;
  position: relative;
}
.btn {
  border-radius: 3px;
  padding: 6px 8px;
  background-color: #e2e4e6;
  border: none;
  display: inline-block;
  color: #fff;
  font: 400 16px/16px $notoKR;
  line-height: 20px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #4a8e38;
  }
}
.btn-success {
  background-color: #5aac44;
  box-shadow: 0 1px 0 #519839;
}
.form-control {
  width: 100%;
  box-sizing: border-box;
  background-color: #091e420a;
  border-radius: 3px;
  display: block;
  margin-bottom: 12px;
  padding: 6px 8px;
  transition: background-color 0.3s;
  outline: none;
}
input[type="text"].form-control,
input[type="password"].form-control,
textarea.form-control {
  font-size: 14px;
  max-width: 100%;
}
.form-control:focus {
  background-color: #fff;
  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
  }
}
</style>
