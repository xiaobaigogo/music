<template>
  <div class="user">
    <div>
      <user-info></user-info>
    </div>
    <div>
      <h5 v-if="user && user.userId && user.userId == this.$route.query.id">
        我喜欢的音乐
      </h5>
      <h5 v-else>TA喜欢的音乐</h5>
      <user-like></user-like>
    </div>
    <h5 v-if="user && user.userId == this.$route.query.id">
      我最近一周收听的音乐
    </h5>
    <user-song :playRecord="playRecord"></user-song>
    <h5 v-if="user && user.userId && user.userId == this.$route.query.id">
      我创建的歌单
    </h5>
    <h5 v-else>TA创建的歌单</h5>
    <div class="good-playlist">
      <cover
        v-for="(item, index) in myplaylist"
        :key="index"
        :dta="item"
        @click="playlistClick(item.id)"
      ></cover>
    </div>
    <h5 v-if="otherplaylist.length && user.userId == this.$route.query.id">
      我喜欢的歌单
    </h5>
    <h5 v-else-if="otherplaylist.length && user.userId != this.$route.query.id">
      TA喜欢的歌单
    </h5>
    <div class="good-playlist">
      <cover
        v-for="(item, index) in otherplaylist"
        :key="index"
        :dta="item"
        @click="playlistClick(item.id)"
      ></cover>
    </div>
  </div>
</template>

<script>
import Cover from "components/content/cover/Cover.vue";
import UserSong from "./childComps/UserSong.vue";
import UserInfo from "./childComps/UserInfo.vue";
import UserLike from "./childComps/UserLike.vue";

import { getUserPlaylist, getUserRecord } from "network/api.js";
export default {
  name: "User",
  data() {
    return {
      // playlist: [],
      playRecord: [],
      myplaylist: [],
      otherplaylist: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters.getbriefUser;
    },
  },
  components: {
    Cover,
    UserSong,
    UserInfo,
    UserLike,
  },
  created() {
    console.log(this.$route.query.id);
    console.log(this.user);
    getUserPlaylist(this.$route.query.id).then((res) => {
      // console.log(res);
      res.playlist = res.playlist.map(
        ({ id, coverImgUrl, createTime, name, playCount, creator }) => {
          creator = {
            nickname: creator.nickname,
            userId: creator.userId,
            avatarUrl: creator.avatarUrl,
          };
          return {
            id,
            picUrl: coverImgUrl,
            publishTime: createTime,
            name,
            playCount,
            creator,
          };
        }
      );

      this.myplaylist = res.playlist.filter(({ creator }) => {
        return creator.userId == this.$route.query.id;
      });
      this.otherplaylist = res.playlist.filter(({ creator }) => {
        return creator.userId != this.$route.query.id;
      });
    });
    getUserRecord(this.$route.query.id)
      .then((res) => {
        console.log(res);
        if (res.code == -2) {
          this.playRecord = [];
          return;
        }
        this.playRecord =
          res.weekData && res.weekData.length > 0
            ? res.weekData.map(({ playCount, score, song }) => {
                song = {
                  al: song.al,
                  ar: song.ar,
                  id: song.id,
                  name: song.name,
                  picUrl: song.al.picUrl,
                  dt: song.dt,
                };
                return { playCount, score, song };
              })
            : [];
      })
      .catch((err) => err);
  },
  methods: {
    playlistClick(id) {
      this.$router.push({
        path: "/playlist/detail",
        query: { id: id },
      });
    },
  },
};
</script>

<style scoped>
.user {
  width: 1200px;
  margin: 0 auto;
}
.good-playlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
h5 {
  padding-left: 0.5rem;
  border-left: 0.2rem solid rgb(190, 19, 19);
  font-size: 1.5rem;
  margin: 1.5rem 0;
}
</style>