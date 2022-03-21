<template>
  <div id="app">
    <main-nav-bar v-show="showHeadAndBottom"></main-nav-bar>
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <current-song :showHeadAndBottom="showHeadAndBottom"></current-song>
    <bottom-bar v-show="showHeadAndBottom"></bottom-bar>
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
import { getCurrentInstance } from "@vue/runtime-core";
// import Toast from "components/common/toast";

export default {
  name: "APP",
  components: {
    MainNavBar,
    CurrentSong,
    // Scroll,
    BottomBar,
  },
  data() {
    return {
      showHeadAndBottom: true,
      abc: true,
    };
  },
  watch: {
    $route(to, from) {
      this.showHeadAndBottom = to.path.indexOf("/login") == -1 ? true : false;
      // console.log("----");
      // Toast({ message: "去往其他页面" });
    },
  },
  setup() {
    const internalInstance = getCurrentInstance();
    // console.log(internalInstance.appContext.config.globalProperties.$toast);
    internalInstance.appContext.config.globalProperties.$toast({
      message: "去往其他页面",
    });
  },
  created() {
    // 需要初始化，因为watch拿不到初始值，只有在变的时候才能响应
    this.showHeadAndBottom =
      this.$route.path.indexOf("/login") == -1 ? true : false;
    // console.log(this.$route.path.indexOf("/login") == -1);
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
