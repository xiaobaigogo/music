<template>
  <button @click="playAll(tracksId)">播放全部</button>
</template>

<script>
export default {
  name: "PlayAll",
  props: {
    tracksId: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    playAll(tracksId) {
      console.log(tracksId);
      this.$bus.emit("playAll", tracksId);
    },
  },
};
</script>

<style scoped>
button {
  position: relative;
  left: 88%;
  top: 4%;
  width: 6rem;
  font-size: 1rem;
  height: 2.5rem;
  background-color: rgb(228, 34, 34);
  color: #fff;
  border-radius: 1.2rem;
}
</style>