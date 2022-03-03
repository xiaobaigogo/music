<template>
  <table>
    <thead>
      <th></th>
      <th>标题</th>
      <th>时长</th>
      <th>歌手</th>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in tracks"
        :key="index"
        :class="{ trbg: index % 2 == 0 }"
      >
        <td>{{ index + 1 }}</td>
        <td v-if="index < 3" class="songname">
          <div class="pic-songname">
            <img :src="item.al.picUrl" alt="" />
            <i
              @click="
                songClick(item.id, item.al.picUrl, item.name, item.ar, item.dt)
              "
            ></i>
            <span>{{ item.name }}</span>
          </div>
        </td>
        <td v-else class="songname">
          <i
            @click="
              songClick(item.id, item.al.picUrl, item.name, item.ar, item.dt)
            "
          ></i>
          <span>{{ item.name }}</span>
        </td>
        <td>{{ formatTime(item.dt, 1000) }}</td>
        <td class="arname">
          <div v-for="(ar, index) in item.ar" :key="index">{{ ar.name }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { formatTime } from "common/utils.js";
export default {
  name: "ListContentTopList",
  props: {
    tracks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    formatTime,
    songClick(id, picUrl, name, ar, dt) {
      // console.log("点击playsong");
      this.$bus.emit("playSong", { id, picUrl, name, ar, dt });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border: 2px solid rgb(218, 217, 217);
  border-top: 3px solid #a31313;
  margin-top: 0.5rem;
  border-collapse: collapse;
}
thead {
  background-color: #ebe1e1;
  height: 2rem;
}
thead > tr > td:first-child {
  width: 10%;
}
.songname {
  width: 50%;
  text-align: left;
}

thead > tr > td:nth-child(3) {
  width: 10%;
}
.arname {
  width: 30%;
}
/* th {
  text-align: left;
} */
td {
  padding: 1rem 0.5rem;
  text-align: center;
}
.pic-songname {
  display: flex;
  align-items: center;
}
.pic-songname img {
  width: 20%;
  border-radius: 3px;
  box-shadow: 1px 1px rgba(1, 1, 1, 0.1);
  margin-right: 1rem;
}
/* .pic-songname span{
  width: 80%;
  padding-left: 1.5rem;
} */
.trbg {
  background-color: #f8f5f5;
}
i {
  display: inline-block;
  box-sizing: border-box;
  background: url(~assets/images/table.png) no-repeat;
  background-position: 0 -127px;
  margin: 0 5px;
  width: 20px;
  height: 18px;
  overflow: hidden;
  margin-left: 0.5rem;
  /* vertical-align:middle; */
}
i:hover {
  background-position: -20px -127px;
  cursor: pointer;
}
.songname span {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  /* width: calc(100% - 20px); */
}
</style>