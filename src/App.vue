<template>
  <div class="app">

    <!-- 第一种写法,name属性 -->
    <router-view v-slot="props">
      <keep-alive include="home">
      <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <!-- 第二种写法 -->
    <!-- <keep-alive includes="home">
    <router-view></router-view>
    </keep-alive> -->
    <tab-bar v-show="!route.meta.hiddeTabBar" />
    <loading />
  </div>
</template>

<script setup>
import tabBar from "./components/tab-bar/tab-bar.vue";
import Loading from "./components/loading/loading.vue";

import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
</style>
