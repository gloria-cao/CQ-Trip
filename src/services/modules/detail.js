import CQRequest from "../request/index";

export function getDetailInfos(houseId) {
  return CQRequest.get({
    url: "/detail/infos",
    params: {
      houseId,
    },
  });
}
