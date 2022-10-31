<template>
  <div class="app">
    <router-view></router-view>
    <tab-bar v-if="!route.meta.hiddeTabBar" />
  </div>
</template>

<script setup>
import tabBar from "./components/tab-bar/tab-bar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped></style>
