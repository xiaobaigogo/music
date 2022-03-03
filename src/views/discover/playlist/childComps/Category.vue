<template>
  <div class="category">
    <dl v-for="(val, key, index) in categories" :key="index">
      <dt>{{ val }}</dt>
      <div class="dds">
        <dd
          v-for="(item, i) in subs[index]"
          :key="i"
          @click="typeClick(item.name)"
          :class="{ ing: item.name == tag }"
        >
          {{ item.name }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import { getPlayListCategory } from "network/api.js";
export default {
  name: "Category",
  props: {
    tag: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      categories: {},
      subs: [],
    };
  },
  created() {
    getPlayListCategory().then((res) => {
      this.categories = res.categories;
      this.subs = res.sub.map(({ name, resourceCount, category }) => {
        return { name, resourceCount, category };
      });
      this.subs = this.subsSort(this.categories, this.subs);
    });
  },
  methods: {
    subsSort(category, sub) {
      let len = Object.keys(category).length;
      let newSub = new Array(len);
      for (let i = 0; i < newSub.length; i++) {
        newSub[i] = new Array();
      }
      for (let i in sub) {
        let name = sub[i].name;
        let resourceCount = sub[i].resourceCount;
        let obj = {};
        obj["name"] = name;
        obj["resourceCount"] = resourceCount;
        newSub[Number(sub[i].category)].push(obj);
      }
      return newSub;
    },
    typeClick(tag) {
      this.$emit("changePlayList", tag);
    },
  },
};
</script>

<style scoped>
.category {
  width: 70.8rem;
  margin: 0 auto;
  border: 1px solid rgb(201, 197, 197);
  background-color: #f5f8f5;
}
dl {
  display: flex;
  align-items: center;
}
dt,
dd {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  margin: 0.5rem 0.5rem;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  /* background-color: #eb1628; */
}
dt {
  margin: 0.2rem 0;
  padding: 0.8rem 1rem 0.8rem 0.2rem;
  flex-basis: 5%;
  border-left: 0.5rem solid #eb1628;
}
.dds {
  flex-basis: 95%;
  display: flex;
  flex-wrap: wrap;
}
.ing {
  background-color: #eb1628;
  border-radius: 0.5rem;
  color: #fff;
}
</style>