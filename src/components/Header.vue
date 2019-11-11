<template>
  <nav>
    <div class="title">Patiro task</div>
    <ul>
      <li>
        <router-link exact active-class="active" to="/">Members</router-link>
      </li>
      <li>
        <router-link exact active-class="active" to="/surveys">Surveys</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang='scss' scoped>
nav {
  // background-color: rgb(212, 212, 212);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  background-color: $bg_gray;
  position: relative;
  padding: 1.25rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 1.25rem;
  // color: $primary_color;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}
li a {
  padding: 0.25rem;
  margin: 0 0.75rem;
}
.active {
  border-bottom: 2px solid $primary_color;
}
</style>>
