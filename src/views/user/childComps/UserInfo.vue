<template>
  <div class="user-info">
    <div class="avatar">
      <img :src="profile.avatarUrl" alt="" />
    </div>
    <div class="info">
      <h5>{{ profile.nickname }}</h5>
      <span>生日：{{ getBirthday }}</span>
      <p>{{ profile.signature }}</p>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "network/api.js";
export default {
  name: "UserInfo",
  data() {
    return {
      id: "",
      profile: {},
    };
  },
  computed: {
    getBirthday() {
      let date = new Date(this.profile.birthday);
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = date.getDay();
      if (day < 10) {
        day = "0" + day;
      }
      return month + "-" + day;
    },
  },
  created() {
    this.id = this.$route.query.id;
    getUserInfo(this.id).then((res) => {
      let profile = res.profile;
      this.profile = {
        creaTime: profile.creaTime,
        birthday: profile.birthday,
        nickname: profile.nickname,
        avatarUrl: profile.avatarUrl,
        signature: profile.signature,
      };
    });
  },
};
</script>

<style scoped>
.user-info {
  width: 1200px;
  margin: 5rem auto;

  display: flex;
}
.avatar {
  width: 30%;
  margin-left: 5rem;
}
.avatar img {
  width: 80%;
  border-radius: 0.5rem;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.info h5 {
  /* flex:  */
  font-size: 1.5rem;
  /* height: 30%; */
  padding: 1rem 0;
  border-bottom: 2px solid #eee;
}
.info span {
  font-size: 1.2rem;
  color: #b8bbb8;
  padding: 1rem 0;
}
.info p {
  font-size: 1.2rem;
  padding: 1rem 0;
}
</style>