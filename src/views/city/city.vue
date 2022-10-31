<template>
  <!-- <div class="city top-page"> -->
  <div class="city">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      <!-- tab的切换 -->
      <!-- tabActive默认绑定的是索引 -->
      <van-tabs v-model:active="tabActive" color="var(--primary-color)">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- 切换效率慢。使用v-show 一种优化 -->
      <template v-for="(value, key, index) in allCities">
        <city-group v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

// import { getCityAll } from "@/services";
import useCityStore from "@/stores/modules/city";
import CityGroup from "./cpns/city-group.vue";

const router = useRouter();

// 搜索款功能实现
const searchValue = ref("");
const cancelClick = () => {
  // 返回上一级
  router.back();
};

// tab的切换
const tabActive = ref();

// 网络请求, 请求城市数据 ref默认值是undefined，所以最好赋值一个空对象
// const allCity = ref({});
// getCityAll().then((res) => {
//   allCity.value = res.data;
// });

// 从Store中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
// 变成响应式的
const { allCities } = storeToRefs(cityStore);

// 目的：获取选中标签后的数据
// 1.获取正确的key：将tabs中绑定的tabActive正确绑定
// 2.根据key从allCities中获取数据，默认直接获取的数据不是响应式的，必须要用computed包裹
const currentGroup = computed(() => allCities.value[tabActive.value]);
</script>

<style lang="less" scoped>
// top 进行固定定位
// .city {
//   .top {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0px;
//   }
// }

// content进行局部滚动
.city {
  .content {
    height: calc(100vh - 100px);
    overflow-y: auto;
  }
}
</style>