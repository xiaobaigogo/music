<template>
  <div class="artist">
    <div class="type">
      <h5>类型</h5>
      <span data-type="-1" class="ing">全部</span>
      <span data-type="1">男歌手</span>
      <span data-type="2">女歌手</span>
      <span data-type="3">乐队</span>
    </div>
    <div class="area">
      <h5>地区</h5>
      <span data-area="-1" class="ing">全部</span>
      <span data-area="7">华语</span>
      <span data-area="96">欧美</span>
      <span data-area="8">日本</span>
      <span data-area="16">韩国</span>
      <span data-area="0">其他</span>
    </div>
    <div class="initial">
      <h5>首字母</h5>
      <span class="ing">全部</span>
      <span>A</span>
      <span>B</span>
      <span>C</span>
      <span>D</span>
      <span>E</span>
      <span>F</span>
      <span>G</span>
      <span>H</span>
      <span>I</span>
      <span>J</span>
      <span>K</span>
      <span>L</span>
      <span>M</span>
      <span>N</span>
      <span>O</span>
      <span>P</span>
      <span>Q</span>
      <span>R</span>
      <span>S</span>
      <span>T</span>
      <span>U</span>
      <span>V</span>
      <span>W</span>
      <span>X</span>
      <span>Y</span>
      <span>Z</span>
    </div>
    <div class="art-cover">
      <artists-cover
        v-for="(item, index) in artists"
        :key="index"
        :item="item"
      ></artists-cover>
    </div>
  </div>
</template>

<script>
import ArtistsCover from "./childComps/ArtistsCover.vue";
import { getArtist } from "network/api.js";
export default {
  name: "Artist",
  data() {
    return {
      // allArtists: [],
      type: -1,
      area: -1,
      initial: -1,
      limit: 30,
      curOffset: 0,
      artists: [],
    };
  },
  components: {
    ArtistsCover,
  },
  created() {
    getArtist().then((res) => {
      this.artists = res.artists;
    });
  },
  mounted() {
    let spans = document.querySelectorAll("span");
    spans.forEach((span) => {
      span.addEventListener("click", this.select);
    });
  },
  watch: {
    type(newVal, oldVal) {
      getArtist(newVal, this.area, this.initial).then((res) => {
        this.artists = res.artists;
      });
    },
    area(newVal, oldVal) {
      getArtist(this.type, newVal, this.initial).then((res) => {
        this.artists = res.artists;
      });
    },
    initial(newVal, oldVal) {
      getArtist(this.type, this.area, newVal).then((res) => {
        this.artists = res.artists;
      });
    },
  },
  methods: {
    select(e) {
      // console.log(e.target.dataset.type);
      if (e.target.dataset.type) {
        let sibling = e.target.parentNode.children;
        for (let i = 0; i < sibling.length; i++) {
          // console.log(sibling[i]);
          sibling[i].classList.remove("ing");
        }
        this.type = Number(e.target.dataset.type);
        e.target.classList.add("ing");
        // console.log(this.type);
        return;
      }
      if (e.target.dataset.area) {
        let sibling = e.target.parentNode.children;
        for (let i = 0; i < sibling.length; i++) {
          // console.log(sibling[i]);
          sibling[i].classList.remove("ing");
        }
        this.area = Number(e.target.dataset.area);
        e.target.classList.add("ing");
        // console.log(this.area);
        return;
      }
      if (e.target.innerHTML) {
        let sibling = e.target.parentNode.children;
        for (let i = 0; i < sibling.length; i++) {
          // console.log(sibling[i]);
          sibling[i].classList.remove("ing");
        }
        this.initial = e.target.innerHTML.toLowerCase();
        e.target.classList.add("ing");
        // console.log(this.initial);
        return;
      }
    },
  },
};
</script>

<style scoped>
.artist {
  width: 1200px;
  margin: 0 auto;
}
h5 {
  font-size: 1.3rem;
  font-weight: 700;
  padding: 1rem 0;
}
span {
  display: inline-block;
  background-color: #f5f8f5;
  padding: 0.5rem 1rem;
  margin: 0 0.2rem;
  border-radius: 6px;
  box-sizing: content-box;
}
span:hover {
  cursor: pointer;
  background-color: crimson;
  color: #fff;
}
.ing {
  background-color: crimson;
  color: #fff;
}
.initial span {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 50%;
  text-align: center;
  padding: 0.5rem 0.5rem;
  margin: 0.5rem 0.5rem;
}
.art-cover {
  display: flex;
  flex-wrap: wrap;
}
</style>