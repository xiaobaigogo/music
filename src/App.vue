<template>
  <div id="app">
    <main-nav-bar v-show="showHeadAndBottom"></main-nav-bar>
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <current-song :showHeadAndBottom="showHeadAndBottom"></current-song>
    <bottom-bar v-show="showHeadAndBottom"></bottom-bar>
    <!-- <demo height='300px' :estimatedItemSize=10 :listData="demoData" v-slot="slotProps">
      <demo-item :item="slotProps.item"></demo-item>
    </demo> -->
  </div>
</template>

<script>
  import MainNavBar from "components/content/navbar/MainNavBar.vue";
  import CurrentSong from "components/content/currentsong/CurrentSong.vue";
  import BottomBar from "components/content/bottombar/BottomBar.vue";
  import { getCurrentInstance } from "@vue/runtime-core";

  export default {
    name: "APP",
    components: {
      MainNavBar,
      CurrentSong,
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
      },
    },
    setup() {
      const internalInstance = getCurrentInstance();
      return internalInstance;
    },
    created() {
      // 需要初始化，因为watch拿不到初始值，只有在变的时候才能响应
      this.showHeadAndBottom =
        this.$route.path.indexOf("/login") == -1 ? true : false;
      // console.log(this.$route.path.indexOf("/login") == -1);

      // 离线缓存：创建存储歌曲的数据库
      this.initSongDB();
    },
    methods: {
      initSongDB() {
        if (this.$store.state.songDB == null) {
          this.$store.dispatch('createSongDB', { name: this.$store.state.songDBname, objectStoreName: this.$store.state.songDBobjectStoreName, dbVersion: this.$store.state.songDBversion })
        }
      }
    }
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