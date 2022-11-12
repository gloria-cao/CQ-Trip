<template>
  <!-- 增加加载动画 -->
  <div @click="loadingClick" class="loading" v-if="mainStore.isLoading">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main";
import { storeToRefs } from "pinia";


const mainStore = useMainStore()
// const { isLoading } = storeToRefs(mainStore)

const loadingClick = () => {
  mainStore.isLoading = false
}
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 灰色的模板 */
  background-color: rgba(0, 0, 0, 0.2);

  .bg {
    height: 104px;
    width: 104px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;
  }

  img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
}
</style>