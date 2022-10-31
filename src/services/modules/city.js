import CQRequest from "../request/index";

export function getCityAll() {
  return CQRequest.get({
    url: "/city/all",
  });
}
