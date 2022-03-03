<template>
  <div class="pages">
    <a href="javascript:void(0)" class="first" @click="setPage('first')"
      >首页</a
    >
    <a href="javascript:void(0)" class="prev" @click="setPage('prev')"
      >上一页</a
    >

    <!-- 这个i是从1开始的 -->
    <a
      href="javascript:void(0)"
      v-for="i in totalPagesData"
      :key="i"
      v-text="showPage(i)"
      v-show="showPage(i)"
      @click="setPage(i)"
      :class="{ ing: currentPage == i }"
    ></a>
    <!-- <a href="javascript:void(0)" v-for="i in totalPagesData" :key="i"></a> -->

    <a href="javascript:void(0)" class="next" @click="setPage('next')"
      >下一页</a
    >
    <a href="javascript:void(0)" class="last" @click="setPage('last')">末页</a>
  </div>
</template>

<script>
export default {
  name: "Pages",
  props: {
    totalPages: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: 1,
      totalPagesData: 0,
    };
  },
  computed: {},
  watch: {
    totalPages: {
      immediate: true,
      handler(newVal, oldVal) {
        if (!newVal) {
          // 表示数据类型是NaN则返回
          // console.log(newVal);
          return;
        }
        this.totalPagesData = newVal;
        // console.log(this.totalPagesData);
        // console.log(newVal);
      },
    },
  },
  methods: {
    showPage(i) {
      // console.log(this.totalPagesData);
      // console.log(i);
      if (this.totalPagesData <= 7) {
        return i;
      }
      if (i == 1 || i == this.totalPagesData) {
        return i;
      } else if (Math.abs(i - this.currentPage) < 2) {
        return i;
      } else if (Math.abs(i - this.currentPage) < 3) {
        return "...";
      } else {
        return;
      }
    },
    setPage(i) {
      switch (i) {
        case "first":
          this.currentPage = 1;
          break;
        case "last":
          this.currentPage = this.totalPagesData;
          break;
        case "prev":
          if (this.currentPage == 1) {
            return;
          }
          this.currentPage -= 1;
          break;
        case "next":
          if (this.currentPage == this.totalPagesData) {
            return;
          }
          this.currentPage += 1;
          break;
        default:
          this.currentPage = i;
      }
      this.$emit("pageChange", this.currentPage);
    },
  },
};
</script>

<style scoped>
a {
  color: rgb(51, 51, 51);
  display: inline-block;
  padding: 0.5rem;
  margin: 1rem 0.5rem;
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  background-color: #f5f8f5;
  border-radius: 0.5rem;
}

.prev,
.next {
  width: 4rem;
}
.first,
.last {
  width: 3rem;
}

a:hover,
.ing {
  background-color: #e71c1c;
  color: #fff;
}
</style>