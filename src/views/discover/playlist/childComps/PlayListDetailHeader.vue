<template>
  <div class="playlist-detail-header" v-if="playListDetailHeader.creator">
    <img :src="playListDetailHeader.picUrl" alt="" class="cover" />
    <div class="info">
      <h5>{{ playListDetailHeader.name }}</h5>
      <div class="user">
        <img
          :src="playListDetailHeader.creator.avatarUrl"
          alt=""
          class="profile"
        /><span>{{ playListDetailHeader.creator.nickname }}</span
        ><span>{{ formatTime(playListDetailHeader.createTime, 1000) }}</span>
      </div>
      <div class="tags">
        标签：<span
          v-for="(item, index) in playListDetailHeader.tag"
          :key="index"
          class="tag"
          >{{ item }}</span
        >
      </div>
      <div class="desc">
        <p>{{ playListDetailHeader.description }}</p>
        <div class="all" @click="isShowAllDesc">全部</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "common/utils.js";
export default {
  name: "PlayListDetailHeader",
  props: {
    playListDetailHeader: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      showAllDesc: false,
    };
  },
  methods: {
    formatTime,
    isShowAllDesc() {
      let p = document.querySelector(".desc>p");
      this.showAllDesc
        ? p.classList.remove("show-alldesc")
        : p.classList.add("show-alldesc");
      this.showAllDesc = !this.showAllDesc;
    },
  },
};
</script>

<style scoped>
.playlist-detail-header {
  width: 100%;
  display: flex;
}
.cover {
  width: 16rem;
  height: 16rem;
  border-radius: 2rem;
  box-shadow: 0.5rem 0.5rem rgba(1, 1, 1, 0.6);
}
.info {
  padding-left: 2rem;
}
h5 {
  font-size: 2rem;
  font-weight: 700;
}
.user {
  display: flex;
  align-items: center;
  padding: 2rem 0;
}
.profile {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
}
.tags {
  font-size: 1.2rem;
}
.tag {
  padding: 0.2rem 0.5rem;
  margin: 0 0.3rem;
  background-color: rgb(187, 19, 19);
  color: #fff;
  border-radius: 0.6rem;
  font-size: 1rem;
}

p {
  padding-top: 2rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1.1rem;
}
.show-alldesc {
  display: block;
}
.all {
  text-align: right;
  color: rgba(65, 49, 214, 0.76);
  cursor: pointer;
}
</style>