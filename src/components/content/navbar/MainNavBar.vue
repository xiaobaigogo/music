<template>
  <div class="bg">
    <nav-bar class="main-nav-bar">
      <template v-slot:left>
        <router-link :to="{ name: 'home' }">
          <div class="logo"></div>
        </router-link>
      </template>
      <template v-slot:center>
        <ul class="list">
          <li>
            <router-link :to="{ name: 'home' }">推荐</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'toplist' }">排行榜</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'playlist' }">歌单</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'artist' }">歌手</router-link>
          </li>
        </ul>
      </template>
      <template v-slot:right>
        <div class="right">
          <div class="search">
            <i></i>
            <input type="text" ref="search" />
          </div>

          <!-- <router-link :to="{ name: 'login' }"> 登录 </router-link> -->
          <router-link :to="{ name: 'login' }" v-if="!user || !user.userId">
            登录
          </router-link>
          <div v-else>
            <div class="user" @click.stop="isShowStatus">
              <img :src="user.avatarUrl" alt="" />
              <ul class="user-status" v-show="showStatus">
                <li @click="enterUser">我的主页</li>
                <li @click="logOut">退出登录</li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import { getUserAccount, logout } from "network/api.js";

import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "MainNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      showStatus: false,
    };
  },
  computed: {
    user() {
      console.log(this.$store.getters.getbriefUser);
      return this.$store.getters.getbriefUser;
    },
  },
  methods: {
    getInput() {
      const input = this.$refs.search;
      return input;
    },
    isShowStatus() {
      this.showStatus = !this.showStatus;
    },
    enterUser() {
      console.log(this.user.userId);
      let id = this.user.userId;
      this.$router.push({ path: "/user", query: { id } });
    },
    logOut() {
      logout().then((res) => {
        console.log(res);
      });
      this.$store.commit("changeUserInfo", null);
    },
  },
  created() {
    getUserAccount().then((res) => {
      console.log(res);
      this.$store.commit("changeUserInfo", res.profile);
    });
  },
  mounted() {
    setTimeout(
      this.getInput().addEventListener("keyup", (e) => {
        console.log("main-nav-bar");
        if (e.keyCode == 13 && this.getInput().value != "") {
          this.$router.push({
            path: "/search",
            query: {
              keywords: this.getInput().value,
            },
          });
        }
        // this.getInput().value = "";
      }),
      1000
    );
  },
};
</script>

<style scoped>
.bg {
  width: 1920px;
  background-color: rgb(58, 56, 56);
  box-shadow: 0 2px rgba(1, 1, 1, 0.1);
}
.main-nav-bar {
  width: 1400px;
  margin: 0 auto;
}
.logo {
  background: url(assets/images/topbar.png) no-repeat;
  background-position: 0 -15px;
  height: 100%;
}
.list {
  display: flex;
  font-size: 0.95rem;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
a {
  color: #fff;
}
.right {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: right;
  padding-right: 2rem;
}
.search {
  height: 24px;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  width: 70%;
}
.search i {
  background: url(~assets/images/topbar.png) no-repeat;
  background-position: -9px -108px;
  margin: 0 5px;
  width: 15px;
  height: 15px;
  overflow: hidden;
}
.search input {
  width: calc(100% - 25px - 12px);
  /* border */
}
.user {
  width: 2rem;
  height: 2rem;
  position: relative;
}
.user:hover {
  cursor: pointer;
}
img {
  width: 100%;
  border-radius: 50%;
}
.user-status {
  z-index: 10;
  position: absolute;
  top: 38px;
  right: -140px;
  color: #fff;
  background-color: rgba(1, 1, 1, 0.7);
}
.user-status li {
  width: 10rem;
  text-align: center;
  padding: 0.5rem 0;
  /* background-color: black; */
  /* color: black; */
}
</style>