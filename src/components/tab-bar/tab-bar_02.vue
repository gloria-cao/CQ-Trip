<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="var(--primary-color)">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <img
            v-if="currentIndex !== index"
            :src="getAssetURL(item.image)"
            alt=""
          />
          <img v-else :src="getAssetURL(item.imageActive)" alt="" />
        </van-tabbar-item>
      </template>
    </van-tabbar>

    <!-- <template v-for="(item, index) in tabbarData">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="changeActive(index, item)"
      >
        <img
          v-if="currentIndex !== index"
          :src="getAssetURL(item.image)"
          alt=""
        />
        <img v-else :src="getAssetURL(item.imageActive)" alt="" />
        <span class="text">{{ item.text }}</span>
      </div>
    </template> -->
  </div>
</template>

<script setup>
import { ref } from "vue";

import tabbarData from "@/assets/data/tabbar";
import { getAssetURL } from "@/utils/load_assets";

const currentIndex = ref(0);
</script>

<style lang="less" scoped>
.tab-bar {

  // 找到类, 对类中的CSS属性重写
  // :deep(.class)找到子组件的类, 让子组件的类也可以生效
  :deep(.van-tabbar-item__icon) {
    font-size: 20px;
  }

 img {
  height: 36px;
 }
}
</style>