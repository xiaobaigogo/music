<template>
  <i class="back-top" v-show="showBackTop" @click="backTopClick"></i>
</template>

<script>
  export default {
    name: "BackTop",
    data() {
      return {
        showBackTop: true,
        timer: null,
        scrollY: 0,
      };
    },
    mounted() {
      window.addEventListener("scroll", this.isShowBackTop);
    },
    methods: {
      isShowBackTop() {
        this.scrollY = document.documentElement.scrollTop;
        this.showBackTop = this.scrollY > 400 ? true : false;
      },
      backTopClick() {
        this.timer = setInterval(() => {
          this.scrollY -= 100;
          window.scrollTo(0, this.scrollY);
          // console.log(this.timer);
          if (scrollY <= 0) {
            clearInterval(this.timer);
          }
        }, 16.7);
      },
    },
  };
</script>

<style scoped>
  .back-top {
    background: url(~assets/images/gotop.png) no-repeat;
    position: fixed;
    bottom: 58px;
    right: 20px;
    width: 50px;
    height: 60px;
  }
</style>