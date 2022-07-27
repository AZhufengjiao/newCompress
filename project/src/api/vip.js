import { requestWithoutToken } from "@/utils/request";

export function getSetMeal(userId, scope = -1) {
  return requestWithoutToken("/api/wechat/pay/getPayInfo1", "get", {
    userId,
    scope,
  });
}
