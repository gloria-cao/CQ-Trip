import { defineStore } from "pinia";
import { getHomeHotSuggests } from "@/services";

export const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests();
      this.hotSuggests = res.data;
    },
  },
});
