<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //ref如果是绑定在组件中的,那么通过this.$refs.refname获取到的是一个组件对象.
    // ref如果是绑定在普通的元素中,那么通过this.$refs.refname获取到的是一个元素对象
    (this.scroll = new Bscroll(this.$refs.wrapper, {
      //3表示惯性滚动时也能实时监听此时坐标
      probeType: this.probeType,
      //提供上拉加载更多事件
      pullUpLoad: this.pullUpLoad,
      //使能正常滚动
      observeDOM: true,
      observeImage: true,
      //使里面的点击事件能正常触发
      click: true,
      //鼠标移动可以触发事件? 但是怎么好像不行拖动轮播图
      movable: true,
    })),
      this.scroll.on("scroll", (position) => this.$emit("scroll", position));
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载更多");
        this.$emit("loadMore");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //this.scroll && 表示先看this.scroll有没有存在
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.pullUpLoad && this.scroll.finishPullUp();
    },
    refresh() {
      console.log("----");
      this.scroll && this.scroll.refresh();
    },
    scrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style>
</style>