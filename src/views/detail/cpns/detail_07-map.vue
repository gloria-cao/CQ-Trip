<template>
  <div class="map">
    <detail-section title="地图周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup>
import detailSection from "@/components/detail-section/detail-section.vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  position: {
    type: Object,
    default: () => ({}),
  },
});

const mapRef = ref();

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value);
  const point = new BMapGL.Point(
    props.position.longitude,
    props.position.latitude
  );
  map.centerAndZoom(point, 15);
  const marker = new BMapGL.Marker(point); // 创建标注
  map.addOverlay(marker); // 将标注添加到地图中
});
</script>

<style lang="less" scoped>
.baidu {
  height: 300px;
}
</style>