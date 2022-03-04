<template>
  <div class="list-content">
    <header>
      <div class="title">歌曲列表</div>
      <div class="count">
        <span v-if="trackLength">{{ trackLength }}首歌</span>
        <span v-if="playCount"
          >播放:<span class="play-count">{{ playCount }}</span> 次</span
        >
      </div>
    </header>
    <slot name="table"></slot>
  </div>
</template>

<script>
export default {
  name: "ListContent",
  props: {
    trackLength: Number,
    playCount: Number,
  },
};
</script>

<style scoped>
.list-content {
  width: 100%;
}
header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 2rem;
}
.count {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 3px;
}
.count span:first-child {
  font-size: 1rem;
  color: #747272;
  padding-left: 1rem;
}
.count > span > span.play-count {
  color: #a31313;
}
</style>