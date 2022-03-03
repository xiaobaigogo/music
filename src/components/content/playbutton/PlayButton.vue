<template>
  <i @click="playClick" :class="{ ing: this.curid == this.id }"></i>
</template>

<script>
import { getCurrentSong } from "network/api.js";
export default {
  name: "PlayButton",
  props: {
    id: 0,
  },
  data() {
    return {
      ar: [],
      name: "",
      dt: 0,
      picUrl: "",
      curid: 0,
    };
  },
  mounted() {
    this.$bus.on("nowId", (id) => {
      this.curid = id;
    });
  },
  watch: {
    id: {
      immediate: true,
      handler(newVal) {
        // console.log(newVal);
        getCurrentSong(newVal).then((res) => {
          // console.log(res);
          this.ar = res.songs[0].ar;
          this.name = res.songs[0].name;
          this.dt = res.songs[0].dt;
          this.picUrl = res.songs[0].al.picUrl;
        });
      },
    },
  },
  methods: {
    playClick() {
      let id = this.id;
      let picUrl = this.picUrl;
      let name = this.name;
      let ar = this.ar;
      let dt = this.dt;
      this.$bus.emit("playSong", { id, picUrl, name, ar, dt });
    },
  },
};
</script>

<style scoped>
i {
  display: inline-block;
  box-sizing: border-box;
  background: url(~assets/images/table.png) no-repeat;
  background-position: 0 -127px;
  margin: 0 5px;
  width: 20px;
  height: 18px;
  overflow: hidden;
  margin-left: 0.5rem;
  /* vertical-align:middle; */
}
i:hover {
  background-position: -20px -127px;
  cursor: pointer;
}
.ing {
  background-position: -20px -127px;
  cursor: pointer;
}
</style>