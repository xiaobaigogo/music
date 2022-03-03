<template>
  <div class="top-list">
    <ul class="left">
      <li class="title">云音乐榜单</li>
      <li
        v-for="(item, index) in topList"
        :key="index"
        @click="changeTopList(item)"
        :class="{ active: item.id == info.id }"
      >
        <img :src="item.coverImgUrl" alt="" />
        <div>
          <h5>{{ item.name }}</h5>
          <p>{{ item.updateFrequency }}</p>
        </div>
      </li>
    </ul>
    <div class="right">
      <list-info :info="info"></list-info>
      <list-content
        :playCount="info.playCount"
        :trackLength="info.trackCount"
        class="list-content"
      >
        <template v-slot:table>
          <list-content-top-list :tracks="info.tracks"></list-content-top-list>
        </template>
      </list-content>
    </div>
  </div>
</template>

<script>
import ListInfo from "./childComps/ListInfo.vue";
import ListContent from "components/content/listcontent/ListContent.vue";
import ListContentTopList from "./childComps/ListContentTopList.vue";
import { getTopList, getTopListInfo } from "network/api.js";
export default {
  name: "topList",
  components: {
    ListInfo,
    ListContent,
    ListContentTopList,
  },
  data() {
    return {
      topList: [],
      info: {},
    };
  },
  created() {
    getTopList().then((res) => {
      this.topList = res.list;
      getTopListInfo(this.topList[0].id).then((res) => {
        this.info = res.playlist;
      });
    });
  },
  methods: {
    changeTopList(item) {
      this.$router.push({ path: "/toplist/detail", query: { id: item.id } });
      getTopListInfo(item.id).then((res) => {
        this.info = res.playlist;
        // console.log("改变排行榜");
      });
    },
  },
};
</script>

<style scoped>
.top-list {
  display: flex;
  width: 1200px;
  margin: 0 auto;
}
.left {
  width: 25%;
  background-color: #f8f5f5;
  border: 1px solid rgb(218, 217, 217);
  box-sizing: border-box;
}
.left li {
  display: flex;
  padding: 1rem 1.5rem;
  /* justify-content: center;
  align-items: center; */
}
.left .active {
  background-color: rgb(223, 213, 213);
}
.left .title {
  padding-top: 40px;
  color: black;
  font-size: 1.5rem;
}

.left img {
  width: 30%;
  height: 30%;
}
.left li div {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0 0.5rem 0.9rem;
}
.left li div h5 {
  font-size: 1.2rem;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.right {
  width: 75%;
  padding: 40px 2rem 0 3.5rem;
  box-sizing: border-box;
}
.list-content {
  padding-top: 40px;
}
</style>