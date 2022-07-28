import { requestWithoutToken } from "@/utils/request";

/**
 *  获取套餐信息数据
 * @param {*} userId
 * @param {*} scope
 * @returns
 */
export function getSetMeal(userId, scope = -1) {
  return requestWithoutToken("/api/wechat/pay/getPayInfo1", "get", {
    userId,
    scope,
  });
}

/**
 * 获取工具剩余次数
 * @param {*} userId 用户id
 */
export function getDownloadNum(userId) {
  return requestWithoutToken("/api/vip/checkDownloadNumber", "get", {
    userId,
  });
}
