import { requestWithoutToken } from "@/utils/request";

/**
 * 获取支付宝支付二维码
 * @param {*} productId
 * @param {*} userId 用户id
 * @param {*} ticketType
 * @returns
 */
export function getAlipayQR(productId, userId, ticketType) {
  return requestWithoutToken("/api/alipay/qriousWithCoupon", "get", {
    productId,
    userId,
    ticketType,
  });
}
