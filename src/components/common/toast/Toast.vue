<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: "",
      timer: null,
    };
  },
  methods: {
    show(message = "默认文本", duration = 2000) {
      this.message = message;
      this.isShow = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = () => {
        this.message = "";
        this.isShow = false;
      };
      setTimeout(this.timer, duration);
    },
  },
};
</script>

<style scoped>
.toast {
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