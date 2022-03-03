<template>
  <div class="playlist-detail-subscriber" v-if="subscribers">
    <h5>喜欢这个歌单的人</h5>
    <div class="content">
      <div v-for="(item, index) in subscribers" :key="index">
        <img :src="item.avatarUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayListDetailSubscriber",
  props: {
    subscribers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.playlist-detail-subscriber {
  border: 0.2rem solid #eee;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.1rem rgb(24, 23, 23, 0.2);
}
h5 {
  font-size: 1.3rem;
  padding: 1rem;
  border-left: 0.5rem solid rgb(177, 12, 12);
}
.content {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0.5rem;
}
img {
  width: 3rem;
  height: 3rem;
  margin: 0.4rem;
  border-radius: 0.5rem;
}
</style>