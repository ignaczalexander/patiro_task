<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header";
export default {
  components: {
    Header
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: $bg_gray;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
