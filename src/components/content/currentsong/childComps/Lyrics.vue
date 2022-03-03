<template>
  <div class="lyrics">
    <h5>{{ lyricsName }}</h5>
    <div class="ul">
      <ul ref="lyricsScroll">
        <li
          v-for="(lyricsRow, index) in lyricsContent"
          :key="index"
          :style="{ 'font-size': index == curRow ? '1.3rem' : '0.9rem' }"
        >
          {{ lyricsRow.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatTime } from "common/utils.js";
import { getLyricsContent } from "network/api.js";
export default {
  name: "Lyrics",
  props: {
    lyricsId: {
      type: Number,
      default: 0,
    },
    lyricsTime: {
      type: Number,
      default: 0,
    },
    lyricsName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      lyricsContent: [],
      curRow: 0,
    };
  },
  watch: {
    // 用watch来监听props传进来的值的变化
    lyricsId(newVal, oldVal) {
      // console.log(this);
      getLyricsContent(newVal).then((res) => {
        // console.log(res.lrc.lyric);
        this.formatLyrics(res.lrc.lyric);
      });
    },
    lyricsTime(newVal, oldVal) {
      // console.log(newVal);
      this.lyricsContent.forEach((lycur, index) => {
        // lycur是一个obj,里面包含time和text
        if (lycur.time == newVal) {
          // console.log(lycur.text);
          this.curRow = index;
          // console.log(this.$refs.lyricsScroll);
          this.$refs.lyricsScroll.style.top = -index * 2 + "rem";
        }
      });
    },
  },
  methods: {
    formatTime,
    // 解析歌词
    formatLyrics(lyricsC) {
      // 思路:
      //     1.把歌词按行分开，然后把歌词和时间分开，
      //     2.去掉时间的:和[]符号之后返回一个浮点数时间，
      //     3.在和相对应的歌词组成一个列表
      this.lyricsContent = [];
      const lyricsList = lyricsC.split("\n");
      for (let i in lyricsList) {
        let timearr = lyricsList[i].match(/\[([\S\s][^\[\]]*)\]/g)
          ? lyricsList[i].match(/\[([\S\s][^\[\]]*)\]/g)
          : "";
        let ly = lyricsList[i].match(/\]([\S\s]*)/)
          ? lyricsList[i].match(/\]([\S\s]*)/)[1]
          : "";
        if (ly != "") {
          timearr.forEach((time) => {
            let obj = {};
            let m = parseInt(time.match(/\[([\S\s][^\[\]]*)\:/)[1]);
            let s = parseInt(time.match(/\:([\S\s][^\[\]]*)\]/)[1]);
            let key = m * 60 + s;
            obj.time = key;
            obj.text = ly;
            this.lyricsContent.push(obj);
            // console.log(this.lyricsContent);
          });
        }

        this.lyricsContent.sort((a, b) => {
          a.time - b.time;
        });
      }
      // console.log(lyricsList);
    },
  },
};
</script>

<style scoped>
.lyrics {
  padding: 1rem 0.5rem 0.5rem;
  color: #fff;
  /* position: relative; */
  text-align: center;
  height: 100%;
}
h5 {
  font-size: 1.5rem;
  /* text-align: center; */
}

.ul {
  width: 100%;
  position: relative;
  top: 1rem;
  height: 76%;
  overflow: hidden;
}
ul {
  position: absolute;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}
li {
  padding: 0.5rem;
}
</style>