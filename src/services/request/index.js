import axios from "axios";
import useMainStore from "@/stores/modules/main";

import { BASE_URL, TIMEOUT } from "./config";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();

class CQRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });

    // 拦截器
    this.instance.interceptors.request.use(
      (config) => {
        mainStore.isLoading = true;
        return config;
      },
      (err) => {
        returnerr;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        mainStore.isLoading = false;
        return res;
      },
      (err) => {
        mainStore.isLoading = false;

        return err;
      }
    );
  }
  // 所有的网络请求都需要经过这里，所以这里很适合加载页面
  request(config) {
    // mainStore.isLoading = true;
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
          mainStore.isLoading = false;
        })
        .catch((err) => {
          reject(err);
          mainStore.isLoading = false;
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "get" });
  }

  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

// export default new HYRequest("http://123.207.32.32:9001")
export default new CQRequest(BASE_URL, TIMEOUT);
