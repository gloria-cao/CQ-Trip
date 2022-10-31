<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <!-- 日期范围 -->
    <div
      class="section date-range bottom-gray-line"
      @click="showCalendar = true"
    >
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      :round="false"
      type="range"
      color="#ff9854"
      @confirm="onConfirm"
      :show-confirm="false"
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
    <!-- <div class="list">
      <template v-for="(item, index) in hotSuggest">
        <div class="suggests">{{ item.tagText.text }}</div>
      </template>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useHomeStore } from "@/stores/modules/home";
import useCityStore from "@/stores/modules/city";
import { formmatMonthDay, getDiffDays } from "@/utils/fomat_data";

// 定义props
// const props = defineProps({
//   hotSuggest: {
//     type: Array,
//     default: () => [],
//   },
// });

const router = useRouter();
// 获取当前城市位置 超时问题
const cityClick = () => {
  router.push("/city");
};

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取当前位置成功", res);
    },
    (err) => {
      console.log("获取当前位置失败", err);
    }
  );
};

// 获取当前城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围的处理
const nowDate = new Date();
const newDate = new Date();
newDate.setDate(nowDate.getDate() + 1);

const startDate = ref(formmatMonthDay(nowDate));
const endDate = ref(formmatMonthDay(newDate));
const stayCount = ref(getDiffDays(nowDate, newDate));

const showCalendar = ref(false);
const onConfirm = (value) => {
  // 1.设置日期
  const selectStartDate = value[0];
  const selectendDate = value[1];
  startDate.value = formmatMonthDay(selectStartDate);
  endDate.value = formmatMonthDay(selectendDate);
  stayCount.value = getDiffDays(selectStartDate, selectendDate);

  // 隐藏日历
  showCalendar.value = false;
};

const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
  }

  .position {
    width: 78px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      top: 2px;
      font-size: 12px;
    }

    img {
      margin-left: 3px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

// .data-range {
//   display: flex;
//   text-align: center;
//   justify-content: center;
//   .star {
//     flex: 1;
//   }
//   .stay {
//     flex: 1;
//   }
//   .end {
//     flex: 1;
//   }
// }
</style>