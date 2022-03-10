<template>
  <div class="play-record">
    <div class="title">
      <span class="pr-title">播放记录</span>
      <span class="fac-all" @click="facAll">收藏全部</span>
      <span class="clear-all" @click="clearAll">全部清除</span>
    </div>
    <table class="record">
      <tr
        v-for="(song, index) in songs"
        :key="index"
        @click.stop="playThis(song[0])"
      >
        <td class="playing">
          <i class="playingIcon" v-show="song[0] == curid"></i>
        </td>
        <td class="name">{{ song[1].name }}</td>
        <td class="arname">
          <span v-for="(ar, index) in song[1].ar" :key="index">{{
            ar.name
          }}</span>
        </td>
        <td class="dt">{{ formatTime(song[1].dt, 1000) }}</td>
        <td class="del" @click.stop="delSong(song[0])">x</td>
        <td class="fac">
          <fac :id="song[0]" ref="facone"></fac>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Fac from "components/content/playbutton/Fac.vue";
import { formatTime } from "common/utils.js";
export default {
  name: "PlayRecord",
  props: {
    songs: {
      type: Map,
    },
    curid: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Fac,
  },
  methods: {
    formatTime,
    playThis(id) {
      this.$bus.emit("playSong", { id });
    },
    clearAll() {
      this.$emit("clearAll");
    },
    delSong(id) {
      this.$emit("delSong", id);
    },
    facAll() {
      console.log(this.songs.size);
      for (let i = 0; i < this.songs.size; i++) {
        this.$refs.facone[i].$el.click();
      }
      // console.log();
    },
  },
};
</script>

<style scoped>
.play-record {
  color: #fff;
  width: 100%;
  height: 100%;
  font-style: normal;
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
}
.title {
  display: flex;
}
.pr-title {
  flex-basis: 60%;
}
.fac-all {
  flex-basis: 20%;
}
.clear-all {
  flex: 1;
}
.record {
  width: 100%;
}
tr {
  /* display: flex; */
  margin: 0.5rem 0;
}
.playing {
  width: 5%;
  /* background-color: #fff; */
  text-align: center;
}
.name {
  width: 50%;
  /* background-color: blue; */
}
.arname {
  width: 50px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* display: flex;
  flex-direction: column; */
}
.arname span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.dt {
  width: 15%;
  text-align: center;
}
.playingIcon {
  display: inline-block;
  background: url(~assets/images/playlist.png);
  background-position: -180px 5px;
  width: 1rem;
  height: 1rem;
}
.del {
  font-size: 1.3rem;
}
.fac {
  width: 45px;
  /* background-color: #fff; */
}
</style>