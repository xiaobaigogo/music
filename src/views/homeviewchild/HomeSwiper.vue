<template>
  <swiper :flag="flag" class="swiper" ref="homeswiper" @setTransform="changeBg">
    <swiper-item v-for="(banner, index) in banners" :key="index">
      <img :src="banner.imageUrl" alt="" @load="itemImageLoad(index)" />
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from "components/common/swiper/Swiper.vue";
  import SwiperItem from "components/common/swiper/SwiperItem.vue";
  import { getBanner } from "network/api.js";
  export default {
    name: "HomeSwiper",
    data() {
      return {
        banners: [],
        flag: false,
      };
    },
    components: {
      Swiper,
      SwiperItem,
    },
    methods: {
      async getBannerData() {
        let res = await getBanner();
        if (res.code == 200) {
          // console.log(res);
          this.banners = res.banners.map(
            ({
              encodeId,
              imageUrl,
              targetId,
              targetType,
              titleColor,
              typeTitle,
              url,
            }) => {
              return {
                encodeId,
                imageUrl,
                targetId,
                targetType,
                titleColor,
                typeTitle,
                url,
              };
            }
          );
        }
      },
      itemImageLoad(index) {
        // console.log("-----");
        if (index < this.banners.length - 1) {
          return;
        } else {
          // console.log("-----");
          this.flag = true;
        }
      },
      changeBg(index) {
        // console.log(this.$refs.homeswiper.$el);
        // console.log(this.banners[index] && this.banners[index].hasOwnProperty("imageUrl"));
        this.$refs.homeswiper.$el.style.background = `url(${this.banners[index].imageUrl})`;
        this.$refs.homeswiper.$el.classList.add("activeBg");
      },
    },
    created() {
      this.getBannerData();
    },

    watch: {
      banners(newVal, oldVal) {
        this.changeBg(0);
      },
    },
  };
</script>

<style scoped>
  /* .swiper {
  background-image: url(this.banners[0].imageUrl);
} */
  .swiper::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    /* background-image: linear-gradient(to right, red, yellow); */
    opacity: 0.9;
    backdrop-filter: blur(300px);
    z-index: -1;
  }

  .activeBg {
    background-size: contain;
    transition: background 1s ease;
  }
</style>