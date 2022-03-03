<template>
  <div class="list-info">
    <div class="left">
      <img :src="info.coverImgUrl" alt="" />
    </div>
    <div class="right">
      <h5>{{ info.name }}</h5>
      <p>★ {{ info.description }}</p>
      <p>🕘 最近更新：{{ formatDate(info.updateTime, "MM月dd日") }}</p>
      <ul>
        <li>收藏（{{ info.subscribedCount }}）</li>
        <li>转发（{{ info.shareCount }}）</li>
        <li>评论（{{ info.commentCount }}）</li>
        <li class="download">下载</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils.js";
export default {
  name: "ListInfo",
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped>
.list-info {
  display: flex;
}
.left {
  width: 25%;
}
img {
  width: 214.13px;
  box-sizing: border-box;
  border: 4px double rgb(223, 213, 213);
}
.right {
  width: 75%;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-top: 0.5rem;
}
h5 {
  font-size: 2rem;
}
p {
  padding-top: 1rem;
  color: rgb(110, 108, 108);
  /* 超出两行省略号 */
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
ul {
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
}
ul li {
  padding: 0.25rem 0 0.25rem 0.45rem;
  border: 1px solid rgb(223, 213, 213);
  border-radius: 5px;
  box-shadow: 1px 1px rgba(223, 213, 213, 0.1);
  color: rgb(138, 134, 134);
  /* background-color: rgb(223, 213, 213); */
}
.download {
  padding-right: 0.55rem;
}
ul li:hover {
  cursor: pointer;
}
</style>