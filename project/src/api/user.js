import { requestWithoutToken } from "@/utils/request";

/**
 * 获取用户信息转状态
 * @param {string} userId
 * @returns
 */
export function userList(userId) {
  return requestWithoutToken("/api/wechat/pay/getRole", "get", {
    userId,
  });
}
