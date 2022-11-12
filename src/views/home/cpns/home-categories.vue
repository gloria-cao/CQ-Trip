<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";

const homeStore = useHomeStore();
const { categories } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  margin-top: 5px;
  // 隐藏滚动条 
  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 70px;
    text-align: center;

    img {
      height: 32px;
      width: 32px;
      align-self: center;
    }

    .text {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
</style>