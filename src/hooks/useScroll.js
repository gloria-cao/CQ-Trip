import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { throttle } from "underscore";

export default function useScroll(elRef) {
  let el = window;

  const isReachBottom = ref(false);
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  // 监听window窗口的滚动
  // 防抖、节流
  const scrollListenerHandler = throttle(() => {
    // 当前窗口的高度
    // 下面的变量是局部的，需要在上面定义ref才能传递出去
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // console.log("加载数据");
      // 到达底部
      isReachBottom.value = true;
    }
  }, 100);
  // 监听窗口滚动
  onMounted(() => {
    if (elRef) el = elRef.value;
    console.log(el);
    el.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight };
}
