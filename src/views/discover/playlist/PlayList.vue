<template>
  <div class="play-list">
    <h5>
      <span>{{ tag }}</span>
      <span class="category-fa">
        <button @click.stop="isShowCategory">选择分类</button>
        <i v-show="showCategory"></i>
        <category
          @changePlayList="changePlayList"
          v-show="showCategory"
          class="category"
          ref="category"
          :tag="tag"
        ></category>
      </span>
    </h5>
    <div class="content">
      <cover
        v-for="(item, index) in showlists"
        :key="index"
        :dta="item"
        @click="enterPlayListDetail(item.id)"
      ></cover>
    </div>
    <div class="pages">
      <pages
        :totalPages="Math.ceil(total / limit)"
        @pageChange="pageChange"
      ></pages>
    </div>
  </div>
</template>

<script>
import { getSupremePlayList } from "network/api.js";

import Cover from "components/content/cover/Cover";
import Category from "./childComps/Category.vue";
import Pages from "components/content/pages/Pages.vue";
export default {
  name: "PlayList",
  components: {
    Category,
    Cover,
    Pages,
  },
  data() {
    return {
      tag: "",
      showlists: [],
      total: 0,
      limit: 50,
      offset: 0,
      showCategory: false,
    };
  },
  created() {
    getSupremePlayList().then((res) => {
      this.showlists = res.playlists.map(
        ({ coverImgUrl, createTime, name, playCount, id }) => {
          let publishTime = createTime;
          let picUrl = coverImgUrl;
          return { picUrl, publishTime, name, playCount, id };
        }
      );
      this.total = res.total;
      this.tag = res.cat;
    });
  },
  mounted() {
    document.addEventListener("click", (e) => {
      this.showCategory = false;
    });
  },
  watch: {
    tag: {
      immediate: true,
      handler(newVal) {
        getSupremePlayList(newVal).then((res) => {
          this.showlists = res.playlists.map(
            ({ coverImgUrl, createTime, name, playCount, id }) => {
              let publishTime = createTime;
              let picUrl = coverImgUrl;
              return { picUrl, publishTime, name, playCount, id };
            }
          );
          this.total = res.total;
          this.tag = res.cat;
        });
      },
    },
    offset: {
      immediate: true,
      handler(newVal) {
        getSupremePlayList(this.tag, this.limit, newVal).then((res) => {
          this.showlists = res.playlists.map(
            ({ coverImgUrl, createTime, name, playCount, id }) => {
              let publishTime = createTime;
              let picUrl = coverImgUrl;
              return { picUrl, publishTime, name, playCount, id };
            }
          );
          this.total = res.total;
          // this.tag = res.cat;
        });
      },
    },
  },
  methods: {
    changePlayList(tag) {
      // console.log("监听到" + tag);
      this.tag = tag;
    },
    pageChange(index) {
      console.log(index);
      this.offset = (index - 1) * this.limit;
    },
    isShowCategory() {
      this.showCategory = !this.showCategory;
    },
    enterPlayListDetail(id) {
      console.log(id);
      this.$router.push({
        path: "/playlist/detail",
        query: { id: id },
      });
    },
  },
};
</script>

<style scoped>
.play-list {
  width: 1200px;
  margin: 0 auto;
}
h5 {
  margin: 1rem 0 0.5rem 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 5px solid rgb(206, 13, 13);
  font-size: 1.3rem;
  font-weight: 400;
}
h5 > span {
  /* box-sizing: border-box; */
  display: inline-block;
  vertical-align: center;
  line-height: 1.3rem;
  height: 1.3rem;
  padding-top: 0.2rem;
}
button {
  display: inline-block;
  background-color: #eee;
  padding: 0.2rem 0.5rem;
  border: 1px solid rgb(219, 216, 216);
  margin-left: 1rem;
  vertical-align: bottom;
}
button:hover {
  cursor: pointer;
}
i {
  /* content: ""; */
  width: 0;
  height: 0;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 0.9rem solid #f5f8f5;
  z-index: 2;
  position: absolute;
  top: 1.9rem;
  left: 3rem;
}
.category-fa {
  position: relative;
}
.category {
  position: absolute;
  top: 2.6rem;
  left: 1rem;
  z-index: 1;
}
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.pages {
  text-align: center;
}
</style>