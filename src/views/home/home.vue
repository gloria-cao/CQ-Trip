<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";

// 发送网络请求
// 1、热门建议 传递给searchbox
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>