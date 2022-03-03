<template>
  <div class="info">
    <div v-for="(item, index) in infos" :key="index">
      <h5>{{ item.ti }}</h5>
      <p>{{ item.txt }}</p>
    </div>
  </div>
</template>

<script>
import { getArtistsInfo } from "network/api.js";
export default {
  name: "ArtistsDetailInfo",
  props: {
    id: 0,
  },
  data() {
    return {
      infos: [],
    };
  },
  watch: {
    id: {
      immediate: true,
      handler(newVal) {
        if (newVal == undefined) {
          return;
        }
        getArtistsInfo(newVal).then((res) => {
          // console.log(res);
          this.infos = res.introduction;
        });
      },
    },
  },
};
</script>

<style scoped>
.info {
  padding-top: 2rem;
}
h5 {
  padding: 1rem 1rem;
  border-left: 2px solid rgb(160, 11, 11);
  font-size: 1.2rem;
}
p {
  padding: 1rem 1rem;
  font-size: 1.1rem;
  line-height: 2rem;
  text-indent: 2em;
}
</style>