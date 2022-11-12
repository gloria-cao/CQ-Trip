import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系： path --> components
  // 路由懒加载
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("@/views/home/home.vue"),
    },
    {
      path: "/favor",
      component: () => import("@/views/favor/favor.vue"),
    },
    {
      path: "/message",
      component: () => import("@/views/message/message.vue"),
    },
    {
      path: "/order",
      component: () => import("@/views/order/order.vue"),
    },
    {
      path: "/city",
      component: () => import("@/views/city/city.vue"),
      meta: {
        hiddeTabBar: true,
      },
    },
    {
      path: "/search",
      component: () => import("@/views/search/search.vue"),
      meta: {
        hiddeTabBar: true,
      },
    },
    {
      path: "/detail/:id",
      component: () => import("@/views/detail/detail.vue"),
      meta: {
        hiddeTabBar: true,
      },
    },
  ],
});

export default router;
