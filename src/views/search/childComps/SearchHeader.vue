<template>
  <div class="header">
    <div class="search">
      <input type="text" ref="searchHeader" :value="value" />
      <button title="搜索" ref="btnSearch"></button>
    </div>
    <p v-if="value">搜索"{{ value }}", 找到{{ count }}{{ unit }}{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "SearchHeader",
  props: {
    value: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    unit() {
      switch (this.title) {
        case "歌手":
          return "个";
        case "歌曲":
          return "首";
        case "专辑":
          return "张";
        case "视频":
          return "个";
      }
    },
  },
  methods: {
    getInput() {
      const input = this.$refs.searchHeader;
      // console.log(input);
      return input;
    },
    getBtn() {
      const btn = this.$refs.btnSearch;
      return btn;
    },
  },
  mounted() {
    setTimeout(() => {
      this.getInput().addEventListener("keyup", (e) => {
        console.log("1111");
        // console.log(this.getInput().value);
        if (e.keyCode == 13 && this.getInput().value != "") {
          this.$router.push({
            path: "/search",
            query: {
              keywords: this.getInput().value,
            },
          });
        }
      });
    }, 1000);
    setTimeout(() => {
      this.getBtn().addEventListener("click", (e) => {
        // console.log("1111");
        // console.log(this.getInput().value);
        if (this.getInput().value != "") {
          this.$router.push({
            path: "/search",
            query: {
              keywords: this.getInput().value,
            },
          });
        }
      });
    }, 1000);
  },
};
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
}
input {
  width: 30rem;
  height: 3.5rem;
  box-sizing: border-box;
  border: 0.2rem solid #eee;
  font-size: 1.4rem;
  padding: 0 0.2rem;
}
button {
  /* display: inline-block; */
  width: 5rem;
  height: 3.5rem;
  background: url(~assets/images/search.png) no-repeat;
  background-size: 100%;
}
button:hover {
  cursor: pointer;
}
p {
  padding: 0.5rem 0;
  font-size: 1.4rem;
  color: rgb(170, 166, 166);
}
</style>