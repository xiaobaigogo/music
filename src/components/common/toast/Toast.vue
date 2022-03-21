<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isShow: true,
      // message: "",
      // timer: null,
    };
  },
};
</script>

<style scoped>
.toast {
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20%;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  z-index: 999;
}
</style>