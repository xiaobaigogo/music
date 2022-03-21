<template>
  <i class="fac" @click.stop="fac" ref="fac"> </i>
</template>

<script>
import { likeMusic, likeMusicList } from "network/api.js";
export default {
  name: "Fac",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      like: false,
      allLike: [],
    };
  },
  computed: {
    getId() {
      return this.$store.getters.getbriefUser
        ? this.$store.getters.getbriefUser.userId
        : null;
    },
    getallLikelist() {
      return this.$store.getters.getLikelist;
    },
  },
  methods: {
    fac() {
      console.log(this.id);
      if (this.getId && this.id) {
        this.like = !this.like;
        console.log(this.like);
        likeMusic(this.id, this.like)
          .then((res) => {
            if (this.like && res.code == 200) {
              // 喜欢
              this.$refs.fac.style.backgroundPosition = "-86px -781px";
              this.$store.dispatch("setUserLikelist");
              this.$bus.emit("facId", { id: this.id, like: this.like });

              // setTimeout(() => {
              //   console.log(likeMusicList(this.getId));
              // }, 5000);
            } else if (!this.like && res.code == 200) {
              // 不喜欢或者没get到
              this.$refs.fac.style.backgroundPosition = "-86px -737px";
              this.$store.dispatch("setUserLikelist");
              this.$bus.emit("facId", { id: this.id, like: this.like });
            } else {
              console.log("网络不好");
            }
          })
          .catch((err) => err);
      } else {
        // 调用toast说明未登录，请登录后再使用该功能
      }
    },
  },
  mounted() {
    this.$bus.on("facId", ({ id, like }) => {
      // console.log(id);
      // console.log(this.id);
      this.$nextTick(() => {
        // console.log(this.$refs.fac);
        if (id == this.id && like == true) {
          this.like = true;
          this.$refs.fac &&
            (this.$refs.fac.style.backgroundPosition = "-86px -781px");
        } else if (id == this.id && like == false) {
          this.like = false;
          this.$refs.fac &&
            (this.$refs.fac.style.backgroundPosition = "-86px -737px");
        }
      });
    });
  },
  watch: {
    id: {
      // 主要是监测播放栏的点赞应不应该变色
      immediate: true,
      handler(newVal) {
        if (!this.getId) {
          // 未登录时没变化
          return;
        }
        this.$store.dispatch("setUserLikelist");

        likeMusicList(this.getId).then((res) => {
          let ids = res.ids;
          if (ids && ids.indexOf(newVal) == -1) {
            this.like = false;
            this.$refs.fac.style.backgroundPosition = "-86px -737px";
          } else {
            this.like = true;
            this.$refs.fac.style.backgroundPosition = "-86px -781px";
          }
        });

        // console.log(likeMusicList(this.getId));
      },
    },
  },
};
</script>

<style scoped>
.fac {
  display: inline-block;
  background: url(~assets/images/playbar.png) no-repeat;
  width: 45px;
  height: 45px;
  background-size: 500%;
  /* background-position: -90px -165px; */
  background-position: -86px -737px;
}
</style>