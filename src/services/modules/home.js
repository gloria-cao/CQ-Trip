import CQRequest from "../request/index";

// 获取热点信息
export function getHomeHotSuggests() {
  return CQRequest.get({
    url: "/home/hotSuggests",
  });
}

// 获取分类列表
export function getHomeCategories() {
  return CQRequest.get({
    url: "/home/categories",
  });
}

// 获取内容信息"/home/houselist?page=1"
export function getHomeHouselist(currentPage) {
  return CQRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  });
}
