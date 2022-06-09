<template>
  <div class="current-song-father" v-show="curid != 0 && showHeadAndBottom">
    <audio :src="url" preload="auto"></audio>
    <div class="current-song">
      <div class="play">
        <i class="icon prev" @click="debouncePrev"></i>
        <i class="icon begin" @click="changebegin" :class="{ ing: isPlay }"></i>
        <i class="icon next" @click="debounceNext"></i>
      </div>
      <div class="info">
        <div class="img">
          <img :src="curpic" alt="" />
        </div>
        <div class="ti-pro">
          <div class="title">
            <span class="name">{{ curname }}</span>
            <span v-for="(ar, index) in curars" :key="index" class="ar-name">{{
              ar.name
              }}</span>
          </div>
          <div class="progress">
            <input type="range" min="0" :max="curdt" />
            <span>{{ formatTime(curtime, 1) }}</span>/<span>{{ formatTime(curdt, 1) }}</span>
          </div>
        </div>
      </div>
      <div class="operate">
        <i class="lyrics-icon" @click="isShowLyric">
          <div class="lyrics_show" v-show="showLyric" @click.stop="bye">
            <lyrics :lyricsId="curid" :lyricsTime="curtime" :lyricsName="curname"></lyrics>
          </div>
        </i>
        <!-- <i class="fac"></i> -->
        <fac :id="curid"></fac>
        <i class="share"></i>
      </div>
      <div class="mode">
        <i class="col" @click="isShowCol">
          <div class="col_show" v-show="showCol" ref="stopCol">
            <div class="col_range" @click.stop="bye">
              <div class="col_thumb"></div>
            </div>
          </div>
        </i>

        <i class="mod" @click="changeMode" :class="[
            { randomMode: this.mode == 1 },
            { onlyMode: this.mode == 2 },
          ]"></i>
        <i class="rec" @click="isShowRec">
          <div class="rec_show" v-show="showRec" @click.stop="bye">
            <play-record :songs="songs" :curid="curid" @clearAll="clearAll" @delSong="delSong"></play-record>
          </div>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
  import Toast from "components/common/toast";
  import { formatTime, randomInsert, debounce } from "common/utils.js";
  import { getCurrentSong } from "network/api.js";
  import Lyrics from "components/content/currentsong/childComps/Lyrics.vue";
  import PlayRecord from "components/content/currentsong/childComps/PlayRecord.vue";
  import Fac from "components/content/playbutton/Fac.vue";
  import { songStorage } from "@/mode/Storage.js";
  export default {
    name: "CurrentSong",
    props: {
      showHeadAndBottom: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        //放的是播放记录，不要乱动
        songs: new Map(),
        // 里面存放三个数组，对应三个播放模式，0：循环 1：随机 2：单曲
        // 子数组存放歌曲id，设置播放模式之后就可以选取不同的数组，根据数组id去播放歌曲。
        playList: [[], [], []],
        baseUrl: "https://music.163.com/song/media/outer/url?id=",
        url: "",
        // 播放状态
        isPlay: false,
        // 当前播放的歌曲信息
        curid: 0,
        curpic: "",
        curname: "",
        curars: [],
        curtime: 0,
        curdt: 0,
        // 展示音量栏
        showCol: false,
        // 展示歌词栏
        showLyric: false,
        // 展示播放记录
        showRec: false,
        // 自动播放与点击播放不兼容
        clickProgress: false,
        // 播放模式：默认为循环
        mode: 0,
        // check
        tracks: [],
        // debounce
        debounceNext: debounce(this.next, 2000),
        debouncePrev: debounce(this.prev, 2000),
      };
    },

    components: {
      Lyrics,
      PlayRecord,
      Fac,
    },
    mounted() {
      // 刚进入页面后读取是否有歌单
      // console.log(JSON.parse(localStorage.getItem("song")));
      this.initSongs(songStorage.getItem("song"), songStorage.getItem("cursong"));
      // console.log(this.curid);
      // console.log(Storage);
      this.$bus.on("playSong", ({ id, picUrl, name, ar, dt }) => {
        if (this.curid == id) {
          this.playList[2] = id;
          this.getAudio().currentTime = 0;
          // console.log(this.curtime);
          this.curtime = 0;
          // console.log(this.curtime);
          this.begin();
          return;
        }
        // console.log(id);
        // console.log(picUrl);
        // console.log(name);
        // console.log(ar);
        this.url = "";
        this.curid = id;
        this.issueNowId();
        this.curpic = picUrl ? picUrl : this.songs.get(id).picUrl;
        this.curname = name ? name : this.songs.get(id).name;
        this.curars = ar ? ar : this.songs.get(id).ar;
        this.curtime = 0;
        this.curdt = dt ? dt / 1000 : this.songs.get(id).dt / 1000; //传过来的dt是毫秒，所以要/1000
        // console.log(this.curid, this.curpic, this.curname, this.curars);
        this.url = this.baseUrl + id + ".mp3";
        this.getInput().max = this.curdt;
        if (!this.songs.has(id)) {
          this.songs.set(id, { picUrl, name, ar, dt });
          this.playList[0].push(id);
          this.playList[1].splice(
            this.randomInsert(this.playList[1].length),
            0,
            id
          );
          // console.log(this.songs);
        }
        this.playList[2] = id;

        this.$nextTick(() => {
          // 等创建好dom节点再播放
          this.begin();
        });
      });

      // 播放歌单的全部播放
      this.$bus.on("playAll", (tracksId) => {
        this.clearAll();
        const ids = tracksId.join(",");
        getCurrentSong(ids).then((res) => {
          this.tracks = [];
          this.tracks = res.songs.map(({ name, id, dt, al, ar }) => {
            ar = ar.map(({ id, name }) => {
              return { id, name };
            });
            return { name, id, dt, picUrl: al.picUrl, ar };
          });

          for (let i = 0; i < this.tracks.length; i++) {
            this.songs.set(this.tracks[i].id, {
              picUrl: this.tracks[i].picUrl,
              name: this.tracks[i].name,
              ar: this.tracks[i].ar,
              dt: this.tracks[i].dt,
            });
            this.playList[0][i] = this.tracks[i].id;
            // console.log(this.playList[0]);
            this.playList[1][i] = this.tracks[i].id;
          }

          this.url = "";
          this.curid = tracksId[0];

          this.playList[1] = this.randomArr(this.playList[1]);

          // console.log(this.curid);

          this.issueNowId();
          this.curpic = this.songs.get(this.curid).picUrl;
          this.curname = this.songs.get(this.curid).name;
          this.curars = this.songs.get(this.curid).ar;
          this.curtime = 0;
          this.curdt = this.songs.get(this.curid).dt / 1000; //传过来的dt是毫秒，所以要/1000
          // console.log(this.curid, this.curpic, this.curname, this.curars);
          this.url = this.baseUrl + this.curid + ".mp3";
          this.getInput().max = this.curdt;
          this.playList[2] = this.curid;
          // console.log(this.getAudio());

          this.$nextTick(() => {
            // 等创建好dom节点再播放
            this.begin();
          });
        });
      });

      // console.log("-----");
      this.getInput().addEventListener("click", this.changeProgress);
      this.getAudio().addEventListener("timeupdate", this.handleProgerss);
      this.getColRange().addEventListener("click", this.changeVolumn);

      //歌曲播放结束，跳转下一首
      this.getAudio().addEventListener("ended", this.next);

      // console.log("----1---");

      // 离开网站后，保存信息
      window.addEventListener("beforeunload", this.saveSongs);
    },
    methods: {
      formatTime,
      randomInsert,
      getAudio() {
        const audio = document.querySelector("audio");
        return audio;
      },
      getInput() {
        const input = document.querySelector(".progress input");
        return input;
      },
      getColRange() {
        const col_range = document.querySelector(".col_range");
        return col_range;
      },
      getColFilled() {
        const col_filled = document.querySelector(".col_thumb");
        return col_filled;
      },
      changebegin() {
        const audio = this.getAudio();
        if (audio.paused) {
          // console.log("----play");
          audio.play();
          this.isPlay = true;
        } else {
          audio.pause();
          this.isPlay = false;
        }
      },
      begin() {
        const audio = this.getAudio();
        audio.play();
        this.isPlay = true;
      },
      handleProgerss() {
        // console.log("handle---" + typeof this.curtime);
        if (
          this.clickProgress == true ||
          this.getAudio().currentTime - this.curtime < 1
        ) {
          // console.log("clickProgress为true");
          // this.changebegin();
          return;
        } else {
          this.curtime = parseInt(this.getAudio().currentTime.toFixed(0));
          this.getInput().value = this.curtime + "";
          // console.log("handle自动修改的进度条的值" + this.getInput().value);
          this.getInput().style.backgroundSize =
            (this.curtime / this.curdt) * 100 + "% 100%";
        }

        // this.getInput().max = this.getAudio().duration;
        // console.log(this.curtime_slow);
        // console.log(typeof this.curtime);
        // console.log(typeof this.getAudio().currentTime);
      },
      changeProgress() {
        // console.log(parseFloat(this.getInput().value));
        this.clickProgress = true;
        // console.log(this.clickProgress);
        // console.log("---change" + this.curtime);
        // console.log("点击的进度条的值" + this.getInput().value);
        this.getAudio().currentTime = parseFloat(this.getInput().value);
        this.curtime = parseFloat(this.getInput().value);
        // console.log(this.curtime / this.curdt);
        this.getInput().style.backgroundSize =
          (this.curtime / this.curdt) * 100 + "% 100%";
        this.clickProgress = false;
      },
      changeVolumn(e) {
        // const percent =
        //   ((e.target.offsetHeight - e.offsetY) /
        //     this.getColRange().offsetHeight) *
        //   100;
        console.log(e.target);
        const percent =
          ((e.target.offsetHeight - e.offsetY) /
            this.getColRange().offsetHeight) *
          100;
        console.log(percent);
        // console.log(percent);
        this.getColFilled().style.flexBasis = `${percent}%`;
        this.getAudio().volume = percent / 100;
      },
      isShowCol(e) {
        console.log(e.target);
        e.stopPropagation();
        if (e.target == this.$refs.stopCol) {
          console.log(e.target);
          return;
        }
        console.log(e.target);
        this.showCol = !this.showCol;
      },
      isShowLyric() {
        this.showLyric = !this.showLyric;
      },
      isShowRec() {
        this.showRec = !this.showRec;
      },
      bye() {
        return;
      },
      // 当播放记录Map发生改变，重新改变playList数组[0]
      // 清除所有播放记录
      clearAll() {
        this.songs.clear();
        this.playList = [[], [], []];
      },
      // 删除某一首歌
      delSong(id) {
        // console.log("-------");
        // console.log(id);
        this.songs.delete(id);
        // console.log(this.songs.has(id));

        let index0 = this.playList[0].indexOf(id);
        let index1 = this.playList[1].indexOf(id);
        // console.log(index0);
        // console.log(index1);

        if (index0 == 0) {
          this.playList[0].shift();
        } else if (index0 == this.playList[0].length - 1) {
          this.playList[0].pop();
        } else {
          let arrTemp = this.playList[0].slice(0);
          let temp1 = arrTemp.slice(0, index0);
          let temp2 = arrTemp.slice(index0 + 1);
          this.playList[0] = temp1.concat(temp2);
          // console.log(this.playList[0]);
        }

        if (index1 == 0) {
          this.playList[1].shift();
        } else if (index1 == this.playList[1].length - 1) {
          this.playList[1].pop();
        } else {
          let arrTemp = this.playList[1].slice(0);
          let temp1 = arrTemp.slice(0, index1);
          let temp2 = arrTemp.slice(index1 + 1);
          this.playList[1] = temp1.concat(temp2);
          // console.log(this.playList[1]);
        }
      },
      // 上一首
      prev() {
        if (this.playList[this.mode].length == 0) {
          this.getAudio().pause();
          this.isPlay = false;
          return;
        }
        if (this.mode == 2) {
          this.$bus.emit("playSong", { id: this.playList[this.mode] });
          return;
        }
        let cur = this.playList[this.mode].indexOf(this.curid);
        let prev = 0;
        prev = cur == 0 ? this.playList[this.mode].length - 1 : cur - 1;
        let id = this.playList[this.mode][prev];
        this.$bus.emit("playSong", { id });
      },
      // 下一首
      next() {
        if (this.playList[this.mode].length == 0) {
          this.getAudio().pause();
          this.isPlay = false;
          return;
        }
        if (this.mode == 2) {
          this.$bus.emit("playSong", { id: this.playList[this.mode] });
          return;
        }
        // console.log("next");
        let cur = this.playList[this.mode].indexOf(this.curid);
        let next = 0;
        next = cur == this.playList[this.mode].length - 1 ? 0 : cur + 1;
        let id = this.playList[this.mode][next];
        this.$bus.emit("playSong", { id });
      },

      // 改变播放模式
      changeMode() {
        if (this.mode == 2) {
          this.mode = 0;
          // this.playList[2] = this.id;
        } else {
          this.mode++;
        }
        console.log(this.playList);
      },
      // 发出当前id，让对应的播放按钮变红色
      issueNowId() {
        this.$bus.emit("nowId", this.curid);
      },
      // 点击全部播放后，将随机播放模式的数组打乱
      randomArr(arr) {
        let arrTemp = new Array(arr.length);
        let end = arr.length;
        for (let i = 0; i < arr.length; i++) {
          let index = this.randomInsert(end);
          arrTemp[i] = arr[index];
          arr[index] = arr[end - 1];
          end--;
        }
        // console.log(arrTemp);
        return arrTemp;
      },
      // 离开前保存数据
      saveSongs() {
        // console.log("uuu");
        let expire = Date.now() + 1000 * 60 * 60 * 24;
        let cursong = {
          curid: this.curid,
          curars: [...this.curars],
          curname: this.curname,
          curpic: this.curpic,
          curdt: this.curdt,
        };
        // console.log(cursong);
        songStorage.setItem("cursong", cursong, expire);
        songStorage.setItem(
          "song",
          // Object.fromEntries(this.songs.entries()),
          this.songs,
          expire
        );

        // console.log(expire);
      },
      // 重新进入时读取数据
      initSongs(songs, cursong) {
        // console.log(songs, cursong);
        if (!songs && !cursong) {
          return;
        }
        for (let key in songs) {
          this.songs.set(parseInt(key), songs[key]);
          this.playList[0].push(parseInt(key));
          this.playList[1].push(parseInt(key));
        }
        // console.log(cursong);
        let { curars, curid, curname, curpic, curdt } = cursong;
        this.curid = curid;
        this.curars = curars;
        this.curname = curname;
        this.curpic = curpic;
        this.curdt = curdt;
        this.url = this.baseUrl + curid + ".mp3";

        // 三种播放模式
        this.playList[2] = this.curid;
        this.playList[1] = this.randomArr(this.playList[1]);
      },
    },
  };
</script>

<style scoped>
  .current-song-father {
    position: fixed;
    display: block;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    z-index: 2;
    background-color: rgba(1, 1, 1, 0.8);
  }

  .current-song {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
  }

  .play {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .icon {
    margin: 0 0.25rem;
  }

  i:hover {
    cursor: pointer;
  }

  .prev {
    background: url(~assets/images/playbar.png) no-repeat;
    background-position: 0 -130px;
    width: 28px;
    height: 28px;
  }

  .begin {
    background: url(~assets/images/playbar.png) no-repeat;
    background-position: 0 -205px;
    width: 35px;
    height: 35px;
  }

  .begin.ing {
    background-position: 0 -166px;
  }

  .next {
    background: url(~assets/images/playbar.png) no-repeat;
    background-position: -80px -130px;
    width: 28px;
    height: 28px;
  }

  .info {
    display: flex;
    width: 60%;
    padding-left: 20px;
  }

  .info .img {
    position: relative;
    /* 设置宽高是为了消除子元素img绝对定位脱离文档流的影响 */
    height: 100%;
    width: 3rem;
  }

  .info img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 3rem;
    height: 3rem;
    border-radius: 0.1rem;
  }

  .ti-pro {
    padding-left: 3rem;
    height: 100%;
    color: rgb(238, 234, 234);
    flex: 1;
  }

  .title {
    height: 50%;
    line-height: 200%;
  }

  .name {
    font-size: 1rem;
    color: #fff;
  }

  .ar-name {
    display: inline-block;
    padding-left: 1.5rem;
    font-size: 0.5rem;
    color: rgb(238, 234, 234);
  }

  .progress {
    display: flex;
    align-items: center;
  }

  .progress input[type="range"] {
    flex: 1;
    -webkit-appearance: none;
    outline: none;
    height: 0.3rem;
    width: 20rem;
    border-radius: 2px;
    background: -webkit-linear-gradient(#e72828, #e72828) no-repeat #2e2c2c;
    background-size: 0% 100%;
    margin-right: 1rem;
  }

  .progress input[type="range"]::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background: rgb(219, 36, 36);
    cursor: pointer;
    border: 0.25rem solid #fff;
    transition: 0.2s;
  }

  .progress input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    cursor: pointer;

    border-radius: 1.3px;
  }

  .operate {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-left: 1rem;
  }

  .lyrics-icon {
    background: url(~assets/images/lyrics.png);
    width: 45px;
    height: 45px;
    background-size: 90% 180%;
    background-position: 2px 4px;
    position: relative;
  }

  .lyrics_show {
    position: fixed;
    transform: translateX(-46%);
    bottom: 65px;
    width: 640px;
    height: 300px;
    background-color: rgb(65, 63, 63);
    border-radius: 0.5rem;
    z-index: 1;
  }

  /* .fac {
  background: url(~assets/images/playbar.png) no-repeat;
  width: 45px;
  height: 45px;
  background-size: 500%;
  background-position: -129px -236px;
} */
  .share {
    background: url(~assets/images/playbar.png) no-repeat;
    width: 45px;
    height: 45px;
    background-size: 500%;
    /* background-position: -90px -165px; */
    background-position: -172px -236px;
  }

  .mode {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .col {
    background: url(~assets/images/playbar.png) no-repeat;
    width: 39px;
    height: 39px;
    background-size: 500%;
    /* background-position: -90px -165px; */
    background-position: 0 -313px;
    overflow: hidden;
    position: relative;
  }

  .mod {
    background: url(~assets/images/playbar.png) no-repeat;
    width: 39px;
    height: 39px;
    background-size: 500%;
    /* background-position: -90px -165px; */
    background-position: -2px -437px;
    overflow: hidden;
  }

  .randomMode {
    background-position: -83px -313px;
  }

  .onlyMode {
    background-position: -83px -437px;
  }

  .rec {
    background: url(~assets/images/playbar.png) no-repeat;
    width: 34px;
    height: 39px;
    background-size: 500%;
    /* background-position: -90px -165px; */
    background-position: -46px -72px;
    position: relative;
  }

  .col_show {
    /* display: block; */
    position: fixed;
    bottom: 65px;
    width: 35px;
    height: 120px;
    background-color: rgba(1, 1, 1, 0.7);
    border-radius: 0.5rem;
    z-index: 2;
  }

  .col_range {
    display: flex;
    flex-direction: column-reverse;
    height: 90%;
    width: 20%;
    background-color: #fff;
    /* position: absolute; */
    margin: 17% auto;
    border-radius: 0.1rem;
  }

  .col_thumb {
    flex-basis: 30%;
    background-color: #e72828;
  }

  .rec_show {
    position: absolute;
    width: 500px;
    height: 400px;
    bottom: 65px;
    transform: translateX(-60%);
    background-color: #010101e6;
    /* z-index: 999999; */
  }
</style>