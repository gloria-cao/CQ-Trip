<template>
  <div class="detail" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
    />
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 轮播图 ,只有当mainPart有值的时候才展示，防止出现undefined的错误-->
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos :top-infos="mainPart.topModule" />
      <detail-facility
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord :landlord="mainPart.dynamicModule.landlordModule" />
      <detail-comment :comment="mainPart.dynamicModule.commentModule" />
      <detail-notice
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule"></detail-intro>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">小曹旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "@vue/reactivity";

import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";

import TabControl from "@/components/tab-control/tab-control.vue";
import DetailSwipe from "./cpns/detail_01-swipe.vue";
import DetailInfos from "./cpns/detail_02-infos.vue";
import DetailFacility from "./cpns/detail_03-facility.vue";
import DetailLandlord from "./cpns/detail_04-landlord.vue";
import DetailComment from "./cpns/detail_05-comment.vue";
import DetailNotice from "./cpns/detail_06-notice.vue";
import DetailMap from "./cpns/detail_07-map.vue";
import detailIntro from "./cpns/detail_08-intro.vue";
import useScroll from "@/hooks/useScroll";

const router = useRouter();
const route = useRoute();
const houseId = route.params.id;

// 发送网络请求
const detailInfos = ref({});
// 数据过于复杂进行拆分
const mainPart = computed(() => detailInfos.value.mainPart);
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});

const onClickLeft = () => {
  router.back();
};

// tabControl相关的操作
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => {
  return scrollTop.value >= 300 ;
})
// const showTabControl = computed(() => {
//   console.log(scrollTop.value >= 300);
//   return scrollTop.value >= 300;
// });
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  left: 0;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>