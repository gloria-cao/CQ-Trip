<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box />
    <home-categories />
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>
    <!-- <button @click="moreBtnClick">加载更多</button> -->
    <home-content />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { computed, onActivated, watch } from "@vue/runtime-core";

import { useHomeStore } from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll";

import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue";
import SearchBar from "@/components/search-bar/search-bar.vue";
import HomeContent from "./cpns/home-content.vue";

// 发送网络请求
// 1、热门建议 传递给searchbox
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategories(); // 2、推荐类别
homeStore.fetchHouselistData(); // 3.内容

// const moreBtnClick = () => {
//   homeStore.fetchHouselistData(homeStore.currentPage);
// };

const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newValue) => {
  if (isReachBottom) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false;
    });
  }
});

// 搜索框显式的控制
// const isShowSearchBar = ref(false);
// watch(scrollTop, (newTop) => {
//   if (scrollTop.value >= 100) {
//     console.log(111);
//     isShowSearchBar.value = true;
//   }
// });
// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360;
});

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo ({
    top: scrollTop.value
  })
})
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}
.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  // 子绝父相，后定位的会覆盖先定位的
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>