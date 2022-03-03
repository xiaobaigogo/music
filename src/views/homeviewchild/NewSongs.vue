<template>
  <div class="new-songs" v-if="newSongs">
    <table>
      <tr v-for="(item, index) in newSongs" :key="index">
        <td class="index" @mouseenter="notShowIndex" @mouseleave="ShowIndex">
          <span>{{ index + 1 }}</span>
          <i class="play-button"><play-button :id="item.id"></play-button></i>
        </td>
        <td class="cover">
          <img :src="item.picUrl" alt="" />
        </td>
        <td class="artists">
          <span v-for="(ar, index) in item.artist" :key="index">{{
            ar.arname
          }}</span>
        </td>
        <td class="name">
          {{ item.name }}
        </td>
        <td class="dt">
          {{ formatTime(item.dt, 1000) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { formatTime } from "common/utils.js";
import PlayButton from "components/content/playbutton/PlayButton.vue";
export default {
  name: "NewSong",
  props: {
    newSongs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    PlayButton,
  },
  methods: {
    formatTime,
    ShowIndex(e) {
      console.log(e.target.getElementsByTagName("i")[0]);
      e.target.getElementsByTagName("span")[0].style.display = "inline-block";
      e.target.getElementsByTagName("i")[0].style.display = "none";
    },
    notShowIndex(e) {
      e.target.getElementsByTagName("span")[0].style.display = "none";
      e.target.getElementsByTagName("i")[0].style.display = "inline-block";
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
tr {
  flex-basis: 45%;
  text-align: center;
  padding: 0.5rem 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  border: 0.2rem solid rgb(202, 200, 200);
  box-shadow: 0.2rem 0.2rem rgba(1, 1, 1, 0.2);
}
.index {
  width: 10%;
}
.index:hover {
  width: 10%;
}
.cover {
  width: 10%;
}
.artists {
  width: 10%;
}
.artists > span {
  display: inline-block;
  max-width: 6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name {
  width: 60%;
}
.dt {
  width: 10%;
}
img {
  width: 100%;
}
.play-button {
  display: none;
}
</style>