import CQRequest from "../request/index";

export function getHomeHotSuggests() {
  return CQRequest.get({
    url: "/home/hotSuggests",
  });
}
