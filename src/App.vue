<template>
  <div id="app">
    <main-nav-bar></main-nav-bar>
    <!-- <scroll class="scroll"> -->
    <router-view></router-view>
    <!-- </scroll> -->
    <current-song></current-song>
    <bottom-bar></bottom-bar>
  </div>
  <!-- <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div> -->
</template>

<script>
import MainNavBar from "components/content/navbar/MainNavBar.vue";
import CurrentSong from "components/content/currentsong/CurrentSong.vue";
// import Scroll from "components/common/scroll/Scroll.vue";
import BottomBar from "components/content/bottombar/BottomBar.vue";

export default {
  name: "APP",
  components: {
    MainNavBar,
    CurrentSong,
    // Scroll,
    BottomBar,
  },
};
</script>

<style>
@import url("./assets/css/base.css");
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
/* .scroll {
  height: calc(100% - 60px - 44px);
  overflow: hide;
} */
</style>
