import { requestWithoutToken } from "@/utils/request";

/**
 * 获取支付宝支付二维码
 * @param {*} productId 套餐id
 * @param {*} userId 用户id
 * @param {*} ticketType 套餐类型
 * @returns
 */
export function getAlipayQR(productId, userId, ticketType) {
  return requestWithoutToken("/api/alipay/qriousWithCoupon", "get", {
    productId,
    userId,
    ticketType,
  });
}

/**
 * 获取微信支付二维码
 * @param {*} productId 套餐id
 * @param {*} userId 用户id
 * @param {*} ticketType 套餐类型
 * @returns
 */
export function getWxQR(productId, userId, ticketType) {
  return requestWithoutToken("/api/wechat/pay/qriousWithCoupon", "get", {
    productId,
    userId,
    ticketType,
  });
}

/**
 * 用户是否已支付
 * @param {*} userId 用户id
 * @returns
 */
export function getPayState(formData) {
  return requestWithoutToken("/api/wechat/pay/payStatus", "post", formData);
}
