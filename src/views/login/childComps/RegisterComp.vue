<template>
  <div class="register-comp">
    <div class="logo">
      <img src="~assets/images/cd.png" alt="" />
    </div>
    <div class="name input">
      <span>昵称:</span
      ><input
        type="text"
        class="cellphone"
        placeholder="请输入昵称"
        v-model="user.nickname"
      />
    </div>
    <div class="user input">
      <span>账号:</span
      ><input
        type="text"
        class="cellphone"
        placeholder="请输入手机号"
        v-model="user.phone"
      />
      <span @click="captchaClick">发送验证码</span>
    </div>
    <div class="password input">
      <span>密码:</span
      ><input
        type="password"
        class="password"
        placeholder="请输入密码"
        v-model="user.password"
      />
    </div>
    <div class="check input">
      <span>验证码:</span
      ><input
        type="text"
        class="check"
        placeholder="请输入验证码"
        v-model="user.captcha"
      />
    </div>
    <div class="register-btn">
      <button @click="registerClick">注册</button>
    </div>
    <div class="login" @click="loginClick">登录</div>
  </div>
</template>

<script>
import {
  register,
  isRegister,
  isSameName,
  sendCaptcha,
  verifyCaptcha,
} from "network/api.js";
export default {
  name: "RegisterComp",
  data() {
    return {
      user: {},
      newuser: {},
    };
  },
  methods: {
    loginClick() {
      this.$emit("loginClick");
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
        console.log("发送成功");
      });
    },

    registerClick() {
      if (
        !this.user.phone ||
        !this.user.nickname ||
        !this.user.phone ||
        !this.user.password ||
        !this.user.captcha ||
        !this.user.phone.length != 11
      ) {
        console.log("信息不完整");
        return;
      }
      isRegister(this.user.phone).then((res) => {
        if (res.exist == 1) {
          return;
        } else {
          isSameName(this.user.nickname).then((res) => {
            if (res.duplicated) {
              console.log("昵称重复，请重新输入");
            } else {
              verifyCaptcha(this.user).then((res) => {
                if (res.data) {
                  // console.log("注册成功");
                  register(this.user).then((res) => {
                    console.log(res);
                    this.newuser = res;
                  });
                }
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.register-comp {
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
.input {
  height: 10%;
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  /* text-align: center; */
  /* border: 1px solid transparent; */
}
.input > span:first-child {
  font-size: 1.1rem;
  width: 3rem;
}
.check > span:first-child {
  font-size: 0.92rem;
}
.user > span:last-child {
  font-size: 0.9rem;
  width: 3rem;
  text-align: center;
  background-color: #f5f8f5;
  padding: 0.1rem;
  border-radius: 3px;
}
.user > span:last-child:hover {
  cursor: pointer;
}
.input > input {
  /* display: block; */
  text-align: left;
  box-sizing: border-box;
  flex: 1;
  height: 3rem;
  margin: 0.5rem;
  margin-left: 1rem;
  padding: 0.5rem;
  font-size: 1.1rem;
  border: 0.2rem solid #eee;
  border-radius: 4px;
}
.register-btn {
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
.login {
  text-align: right;
}
.login:hover {
  cursor: pointer;
}
</style>