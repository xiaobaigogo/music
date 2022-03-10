<template>
  <div class="login-comp">
    <div class="logo">
      <img src="~assets/images/cd.png" alt="" />
    </div>
    <div class="user">
      <span>手机号:</span>
      <input
        type="text"
        class="cellphone"
        placeholder="请输入手机号"
        v-model="userInfo.phone"
      />
      <span @click="captchaClick">发送验证码</span>
    </div>
    <div class="captcha">
      <span>验证码:</span>
      <input
        type="text"
        class="captcha"
        placeholder="请输入验证码"
        v-model="userInfo.captcha"
      />
    </div>
    <div class="login-btn">
      <button type="button" @click.stop="loginClick">登录</button>
    </div>
    <div class="register" @click.stop="registerClick">注册</div>
    <div class="qr" @click.stop="qrClick">二维码登录</div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
import { sendCaptcha, verifyCaptcha } from "network/api.js";
export default {
  name: "LoginComp",
  data() {
    return {
      userInfo: {
        phone: "",
        captcha: "",
      },
      userAccount: {},
    };
  },
  // updated() {
  //   console.log(this.userInfo);
  // },

  methods: {
    registerClick() {
      // console.log("注册");
      this.$emit("registerClick");
    },
    captchaClick() {
      console.log("1111");
      if (this.userInfo.phone.length != 11) {
        console.log("格式错误");
        // console.log(this.$toast);
        // console.log(this.$toast.show("格式错误", 2000));
        return;
      }
      sendCaptcha(this.userInfo.phone).then((res) => {
        console.log(res.data);
      });
    },
    loginClick() {
      if (
        !this.userInfo.phone ||
        !this.userInfo.captcha ||
        this.userInfo.phone.length != 11
      ) {
        console.log("格式错误");
        return;
      }
      verifyCaptcha(this.userInfo).then((res) => {
        console.log(res);
        console.log(res.data.cookie);
        if (res.data) {
          getUserAccount().then((res) => {
            // this.userAccount = res;
            console.log(res);
            this.$store.commit("changeUserInfo", res.profile);
            this.$router.push({ path: "/" });
          });
          // this.$router.push({ path: "/" });
        }
      });
    },
    qrClick() {
      this.$emit("qrClick");
    },
  },
};
</script>

<style scoped>
.login-comp {
  /* background: url(~assets/images/logbg.jpg) no-repeat; */
  background-color: #fff;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* text-align: center; */
}
.logo {
  width: 40%;
}
.user,
.captcha {
  height: 15%;
  width: 90%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid transparent; */
}
.user > span:first-child,
.captcha > span:first-child {
  font-size: 1.1rem;
  width: 4rem;
}
.user > input,
.captcha > input {
  /* display: block; */
  text-align: left;
  box-sizing: border-box;
  width: 70%;
  height: 3rem;
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1.1rem;
  border: 0.2rem solid #eee;
  border-radius: 4px;
  flex: 1;
}
.user > span:last-child {
  font-size: 0.9rem;
  width: 3rem;
  text-align: center;
  background-color: #f5f8f5;
  padding: 0.1rem;
  border-radius: 3px;
  width: 3rem;
}
.user > span:last-child:hover {
  cursor: pointer;
}
.login-btn {
  width: 80%;
  height: 3rem;
  background-color: rgb(85, 82, 82);
}
button {
  color: #fff;
  font-size: 1.3rem;
  /* text-align: center; */
  height: 100%;
  line-height: 100%;
  width: 100%;
}
button:hover {
  cursor: pointer;
}
.register {
  text-align: right;
}
.register:hover {
  cursor: pointer;
}
.qr:hover {
  cursor: pointer;
}
</style>