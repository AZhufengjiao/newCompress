import { requestWithoutToken } from "@/utils/request";

/**
 *  获取套餐信息数据
 * @param {*} userId
 * @param {*} scope
 * @returns
 */
export function getSetMeal(userId = -1, scope = -1) {
  console.log(userId);
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
/**
 *  扣除下载点数
 * @param {*} picNumber
 * @param {*} userId
 * @returns
 */
export function getKillDownloadNum(picNumber, userId) {
  return requestWithoutToken("/api/vip/killDownloadNumber", "get", {
    picNumber,
    userId,
  });
}

/**
 *  获取可用优惠券
 * @param {*} memberId 优惠券id
 * @returns
 */
export function getMyCoupon(memberId) {
  return requestWithoutToken("/api/coupon/getMyCoupon", "get", { memberId });
}
