<template>
  <li class="slide">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "SwiperItem",
};
</script>

<style>
.slide {
  width: 100%;
  display: inline-block;
}
.slide img {
  width: 100%;
  vertical-align: middle;
}
</style>