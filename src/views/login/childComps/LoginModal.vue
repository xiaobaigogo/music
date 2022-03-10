<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-content">
      <img :src="qrImg" alt="" />
      <span class="text">扫描二维码</span>
      <!-- <span class="text" @click="f5Click">刷新二维码</span> -->
      <span @click="xClick" class="close">X</span>
    </div>
  </div>
</template>

<script>
import {
  createQrkey,
  createQr,
  verifyQr,
  getUserAccount,
} from "network/api.js";
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      unikey: "",
      qrImg: "",
      cookie: "",
      timer: null,
    };
  },
  methods: {
    xClick() {
      this.$emit("xClick");
      clearInterval(this.timer);
    },
    f5Click() {
      clearInterval(this.timer);
      this.unikey = "";
      this._createQrkey();
    },
    _createQrkey() {
      createQrkey().then((res) => {
        if (this.timer) {
          clearInterval(this.timer);
        }
        console.log(res);
        this.unikey = res.data.unikey;
        this._createQr(this.unikey, true);
      });
    },
    _createQr(key, qrimg) {
      createQr(key, qrimg).then((res) => {
        // console.log(res);
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.qrImg = res.data.qrimg;
        this.timer = setInterval(() => {
          this._verifyQr(key);
        }, 3000);
      });
    },
    _verifyQr(key) {
      verifyQr(key).then((res) => {
        console.log(this.timer);
        // console.log(res);
        console.log(res.code);
        if (res.code == 803) {
          console.log("---进入");
          console.log(res);
          this.cookie = res.cookie;
          getUserAccount().then((res) => {
            console.log(res.profile.userId);
            this.$store.commit("changeUserInfo", res.profile);
            // window.sessionStorage.setItem("UserId", res.profile.userId);
            // window.sessionStorage.setItem("cookie", this.cookie);
            this.$router.push({ path: "/" });
          });
          clearInterval(this.timer);
          console.log(this.timer);
        } else if (res.code == 800) {
          clearInterval(this.timer);
        }
        // console.log(timer);
      });
    },
  },
  mounted() {
    this._createQrkey();
  },
};
</script>

<style scoped>
.modal-bg {
  background-color: rgba(1, 1, 1, 0.7);
  width: 100%;
  height: 100%;
  /* z-index: 10; */
  position: relative;
}
.modal-content {
  background-color: #fff;
  width: 20rem;
  height: 25rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}
img {
  margin-top: 2rem;
  width: 90%;
  height: 70%;
}
.text {
  width: 50%;
  height: 30%;
  text-align: center;
}
.close {
  position: absolute;
  right: 5%;
  top: 2%;
}
.close:hover {
  cursor: pointer;
}
</style>