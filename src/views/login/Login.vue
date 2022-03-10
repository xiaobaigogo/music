<template>
  <div class="login">
    <login-comp
      class="comp"
      @registerClick="registerClick"
      @qrClick="qrClick"
      v-if="showLogin"
    ></login-comp>
    <register-comp class="comp" @loginClick="loginClick" v-else></register-comp>
    <login-modal :show="showQr" @xClick="xClick" v-if="showQr"></login-modal>
  </div>
</template>

<script>
import LoginComp from "./childComps/LoginComp.vue";
import RegisterComp from "./childComps/RegisterComp.vue";
import LoginModal from "./childComps/LoginModal.vue";
export default {
  name: "Login",
  data() {
    return {
      showLogin: true,
      showQr: false,
    };
  },
  components: {
    LoginComp,
    RegisterComp,
    LoginModal,
  },
  methods: {
    registerClick() {
      this.showLogin = false;
    },
    loginClick() {
      this.showLogin = true;
    },
    qrClick() {
      console.log("qrClcik");
      this.showQr = true;
    },
    xClick() {
      console.log("xClick");
      this.showQr = false;
    },
  },
};
</script>

<style scoped>
.login {
  background: url(~assets/images/newbg1.png) no-repeat;
  width: 100%;
  height: 900px;
  background-color: rgb(56, 36, 27);
  position: relative;
}
.comp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>