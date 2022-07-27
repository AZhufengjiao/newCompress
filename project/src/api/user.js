import { requestWithoutToken } from "@/utils/request";

export function userList(userId) {
  return requestWithoutToken("/api/wechat/pay/getRole", "get", {
    userId,
  });
}
