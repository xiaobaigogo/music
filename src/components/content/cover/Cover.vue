<template>
  <div class="cover">
    <div class="img">
      <img :src="dta.picUrl" alt="" :title="dta.name" />
    </div>
    <h5>{{ dta.name }}</h5>
    <p v-if="dta.publishTime">
      {{ formatDate(dta.publishTime, "yyyy.MM.dd") }}
    </p>
    <span v-if="dta.size">歌曲数：{{ dta.size }}</span>
    <span v-if="dta.playCount">播放量：{{ formatCount(dta.playCount) }}</span>
  </div>
</template>

<script>
import { formatDate, formatCount } from "common/utils.js";
export default {
  name: "Cover",
  props: {
    dta: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    formatDate,
    formatCount,
  },
};
</script>

<style scoped>
.cover {
  position: relative;
  width: 15%;
  color: #fff;
  margin: 0.5rem 1rem;
  margin-top: 1.5rem;
}
.img {
  width: 100%;
  /* height: 90%; */
}
img {
  width: 100%;
  border-radius: 5px;
  /* height: 100%; */
}
img:hover {
  cursor: pointer;
}
h5 {
  color: black;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
p {
  color: rgb(112, 109, 109);
  font-size: 1rem;
}
span {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;

  position: absolute;
  display: inline-block;
  top: 0;
  right: 0;
  background-color: rgba(1, 1, 1, 0.7);
  padding: 0.2rem 0.2rem;
}
</style>