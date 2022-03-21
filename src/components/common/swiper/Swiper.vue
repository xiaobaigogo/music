<template>
  <div class="swiper">
    <div class="swiper-img">
      <ul ref="swiper_img">
        <slot></slot>
      </ul>
    </div>
    <div class="indicator">
      <i
        class="indi-item"
        v-for="(item, index) in slideCount"
        :key="index"
        :class="{ active: index == currentIndex }"
        @click="indexClick(index)"
      ></i>
    </div>
    <div class="side">
      <i class="left" @click="indexClick('left')"></i>
      <i class="right" @click="indexClick('right')"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      slideCount: 0,
      currentIndex: 0,
      itemWidth: 0,
    };
  },
  methods: {
    handleDom() {
      console.log(this.$refs.swiper_img.children.length);
    },
    indexClick(index) {
      // this.handleDom();
      switch (index) {
        case "left":
          this.currentIndex =
            this.currentIndex == 0
              ? this.slideCount - 1
              : this.currentIndex - 1;
          break;
        case "right":
          this.currentIndex =
            this.currentIndex == this.slideCount - 1
              ? 0
              : this.currentIndex + 1;
          break;
        default:
          this.currentIndex = index;
      }
      this.setTransform(-this.currentIndex * this.itemWidth);
    },
    setTransform(position) {
      // this.$refs.swiper_img.classList.remove("fade-in");
      this.$refs.swiper_img.style.transform = `translateX(${position}px)`;
      this.autoChange();
      this.$emit("setTransform", this.currentIndex);
      this.fadeIn();
    },
    fadeIn() {
      // console.log(this.$refs.swiper_img.children[this.currentIndex]);
      for (let i = 0; i < this.slideCount; i++) {
        this.$refs.swiper_img.children[i].style.opacity = 0;
        this.$refs.swiper_img.children[this.currentIndex].style.transition = "";
      }
      this.$refs.swiper_img.children[this.currentIndex].style.opacity = 1;
      this.$refs.swiper_img.children[this.currentIndex].style.transition =
        "opacity 1.5s ease";
    },
    autoChange(duration = 4000) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.currentIndex =
          this.currentIndex == this.slideCount - 1 ? 0 : this.currentIndex + 1;
        this.setTransform(-this.currentIndex * this.itemWidth);
        // console.log(this.currentIndex);
      }, duration);
    },
  },
  watch: {
    flag: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          console.log(this.$refs.swiper_img.children[0]);
          this.slideCount = this.$refs.swiper_img.children.length;
          this.itemWidth = this.$refs.swiper_img.children[0].offsetWidth;
          this.autoChange();
        }
      },
    },
    $route(to, from) {
      clearInterval(this.timer);
    },
  },
};
</script>

<style scoped>
.swiper {
  position: relative;
  z-index: 999;
}
/* .swiper::before {
  content: "";
  position: absolute;
  top: -6px;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://i0.wp.com/airlinkalaska.com/wp-content/uploads//aurora-2.jpg?resize=1024%2C683&ssl=1");
  background-size: cover;
  // 核心代码
  filter: blur(6px); 
  transform: scaleX(1.6); 
  z-index: -1;  
} */
.swiper-img {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  z-index: 99;
}
ul {
  width: 100%;
  white-space: nowrap;
  /* overflow-y: hidden; */
}

.side {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.side i {
  /* width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red; */
  width: 40px;
  height: 65px;
  display: inline-block;
  position: absolute;
}
.left {
  left: 15%;
  background: url(~assets/images/banner.png) no-repeat;
  background-position: 0 -357px;
}
.left:hover {
  background-position: 0 -427px;
}
.right {
  right: 15%;
  background: url(~assets/images/banner.png) no-repeat;
  background-position: 0 -504px;
}
.right:hover {
  background-position: 0 -574px;
}

.indicator {
  position: absolute;
  /* width: 100%; */
  bottom: 4%;
  left: 50%;
  transform: translateX(-50%);
}
.indi-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  display: inline-block;
  margin: 0 0.5rem;
}
.active {
  background-color: red;
}
</style>