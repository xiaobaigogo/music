<template>
  <i @click="playClick" :class="{ ing: this.curid == this.id }"></i>
</template>

<script>
  import { getCurrentSong, getCurrentSongURL } from "network/api.js";
  import { songIndexDB } from "@/mode/indexDB";
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
        url: "",
        flag: false
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
          this.getnewValue(newVal);
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
        let url = this.url;
        let flag = this.flag;
        this.$bus.emit("playSong", { id, picUrl, name, ar, dt, url, flag });
      },
      async getnewValue(newVal) {
        let dbase = this.$store.state.songDB;
        let objectStoreName = this.$store.state.songDBobjectStoreName;

        try {
          let res = await songIndexDB.findSpecialBase(dbase, objectStoreName, newVal);
          // console.log(res);
          if (res !== undefined && res.createTime + 7 * 24 * 60 * 60 * 1000 > Date.now()) { // 缓存中有这个并且在七天之内
            // console.log(res);
            this.ar = JSON.parse(res.ar);
            this.name = res.name;
            this.dt = res.dt;
            this.picUrl = res.picUrl;
            let URL = window.URL || window.webkitURL;
            this.url = URL.createObjectURL(res.blob);
            this.flag = true;

            // URL.revokeObjectURL(this.url);
          } else {  // 缓存中没有这个
            if (res !== undefined) {  // 缓存超出七天，删除
              songIndexDB.deleteBase(dbase, objectStoreName, newVal);
            }
            getCurrentSong(newVal)
              .then((res) => {
                // console.log(res);
                this.ar = res.songs[0].ar;
                this.name = res.songs[0].name;
                this.dt = res.songs[0].dt;
                this.picUrl = res.songs[0].al.picUrl;
              })
              .catch((err) => err);
            getCurrentSongURL(newVal).then((res) => {
              // console.log(res);
              this.url = res.data[0].url;
            }).catch((e) => e);
          }
        } catch (error) {
          console.log(error)
        }
        // console.log(newVal);
      }
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