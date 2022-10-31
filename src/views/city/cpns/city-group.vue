<template>
  <van-index-bar
    :sticky="true"
    highlight-color="#ff9854"
    :index-list="indexList"
  >
    <van-index-anchor index="热门" />
    <div class="list">
      <template v-for="(city, index) in groupData.hotCities">
        <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
      </template>
    </div>
    <template v-for="(group, index) in groupData.cities" :key="index">
      <van-index-anchor :index="group.group" />
      <template v-for="(city, indey) in group.cities" :key="indey">
        <van-cell :title="city.cityName" @click="cityClick(city)" />
      </template>
    </template>
  </van-index-bar>

  <!-- <div class="city-group">
    <template v-for="(group, index) in groupData.cities" :key="index">
      <div class="group-item">
        <h2 class="title">标题 {{ group.group }}</h2>
        <div class="list">
          <template v-for="(city, index) in group.cities" :key="index">
            <div class="city">{{ city.cityName }}</div>
          </template>
        </div>
      </div>
    </template>
  </div> -->
</template>
<script setup>
import useCityStore from "@/stores/modules/city";
import { computed } from "vue";
import { useRouter } from "vue-router";
// 父子组件通信
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});

// 拿到标题进行展示
const indexList = computed(() => {
  // 在最前面加 # 映射热门
  const list = props.groupData.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});

// 监听城市点击
// useRouter全部路由
const router = useRouter();
const cityStore = useCityStore()
const cityClick = (city) => {
  // 1.选中当前城市
  cityStore.currentCity = city

  // 2. 返回上一级
  router.back()
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  // 换行
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin-top: 10px;
  }
}
</style>