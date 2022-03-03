<template>
  <nav class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.nav-bar {
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  height: 44px;
  /* background-color: blue; */
  display: flex;
  width: 100vw;
}

.left {
  width: 160px;
}

.center {
  flex: 1;
}

.right {
  width: 30%;
}
</style>