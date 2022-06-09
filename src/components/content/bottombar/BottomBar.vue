<template>
  <div class="bottom-bar">
    <div class="content">
      <h5>仿网易云项目</h5>
      <a href="https://github.com/xiaobaigogo?tab=repositories">
        <span>xiaobaigogo</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BottomBar",
  };
</script>

<style scoped>
  .bottom-bar {
    margin-top: 5rem;
    width: 100vw;
    height: 300px;
    background-color: rgba(17, 16, 16, 0.815);
    color: #fff;
  }

  .content {
    padding-top: 2rem;
  }

  h5 {
    /* margin-top: 1rem; */
    padding: 2rem 2rem;
    font-size: 1rem;
    border-left: 5px solid red;
  }

  a {
    display: block;
    width: 100px;
    height: 100px;
  }

  span {
    display: block;
    padding-left: 2.5rem;
    color: #fff;
    width: 100%;
    font-size: 0.9rem;
  }
</style>