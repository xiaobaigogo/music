<template>
  <div class="mvs">
    <cover v-for="(item, index) in mvs" :key="index" :dta="item"></cover>
    <div class="bottom">
      <pages
        :totalPages="Math.ceil(mvSize / limit)"
        @pageChange="pageChange"
      ></pages>
    </div>
  </div>
</template>

<script>
import Cover from "components/content/cover/Cover.vue";
import Pages from "components/content/pages/Pages.vue";

import { getArtistsMV } from "network/api.js";
export default {
  name: "ArtistsMv",
  props: {
    id: {
      type: Number,
      default: 0,
    },
    mvSize: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    propsChange() {
      if (this.id != 0 || this.offset != 0) {
        console.log("true");
        return this.id + this.offset;
      } else {
        console.log("false");
        return false;
      }
    },
  },
  data() {
    return {
      mvs: [],
      limit: 48,
      offset: 0,
    };
  },
  components: {
    Cover,
    Pages,
  },
  // setup(props, context) {
  //   watch(() => [props.id, props.limit, props.offset]),
  //     (newVal, oldVal) => {
  //       let id = newVal[0];
  //       let limit = newVal[1];
  //       let offset = newVal[2];
  //       console.log(id, limit, offset);
  //     };
  // },
  watch: {
    // id: {
    //   immediate: true,
    //   handler(newVal) {
    //     if (newVal == undefined) {
    //       return;
    //     }
    //     getArtistsMV(newVal).then((res) => {
    //       console.log(res.mvs);
    //       // console.log(
    //       this.mvs = res.mvs.map(
    //         ({ imgurl, name, id, publishTime, playCount }) => {
    //           let picUrl = imgurl;
    //           return { picUrl, name, id, publishTime, playCount };
    //         }
    //       );
    //     });
    //   },
    // },

    propsChange: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          console.log(this.id);
          console.log(this.limit);
          console.log(this.offset);
          getArtistsMV(this.id, this.limit, this.offset * this.limit).then(
            (res) => {
              console.log(res.mvs);
              // console.log(
              this.mvs = res.mvs.map(
                ({ imgurl, name, id, publishTime, playCount }) => {
                  let picUrl = imgurl;
                  return { picUrl, name, id, publishTime, playCount };
                }
              );
            }
          );
        }
      },
    },
  },
  methods: {
    pageChange(page) {
      // console.log(page);
      this.offset = page;
    },
  },
};
</script>

<style scoped>
.mvs {
  display: flex;
  flex-wrap: wrap;
}
.bottom {
  width: 1200px;
  text-align: center;
}
</style>