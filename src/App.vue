<template>
  <div class="app">
    <router-view></router-view>
    APP Vue
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
import tabBar from './components/tab-bar/tab-bar.vue';
</script>

<style scoped></style>
