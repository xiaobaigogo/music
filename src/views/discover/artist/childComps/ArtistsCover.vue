<template>
  <div class="artists-cover">
    <div class="img">
      <img :src="item.picUrl" alt="" @click="enterSinger(item)" />
    </div>
    <h5>{{ item.name }}</h5>
    <span>单曲数：{{ item.musicSize }}</span>
  </div>
</template>

<script>
export default {
  name: "ArtistsCover",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    enterSinger(item) {
      // console.log("点击封面");
      this.$router.push({ path: "/artist", query: { id: item.id } });
    },
  },
};
</script>

<style scoped>
.artists-cover {
  position: relative;
  width: 15%;
  color: #fff;
  margin: 0.5rem 0.5rem;
  margin-top: 1.5rem;
}
.img {
  width: 100%;
  height: 90%;
}
img {
  width: 100%;
  border-radius: 5px;
  /* height: 100%; */
}
img:hover {
  cursor: pointer;
}
/* h5 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(1, 1, 1, 0.7);
} */
h5 {
  color: black;
  font-size: 1.1rem;
}
span {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;

  position: absolute;
  display: inline-block;
  top: 0;
  right: 0;
  background-color: rgba(1, 1, 1, 0.7);
  padding: 0.2rem 0.2rem;
}
</style>