import { defineStore } from "pinia";
import {
  getHomeCategories,
  getHomeHotSuggests,
  getHomeHouselist,
} from "@/services";

export const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houselist: [],
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests();
      this.hotSuggests = res.data;
    },
    async fetchCategories() {
      const res = await getHomeCategories();
      this.categories = res.data;
    },
    async fetchHouselistData(currentPage) {
      const res = await getHomeHouselist(this.currentPage);
      // 追加新请求的数据
      this.houselist.push(...res.data);
      this.currentPage++;
    },
  },
});
