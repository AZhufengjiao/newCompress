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

/**
 * 个人历史订单
 * @param {number} userId 用户id
 * @param {number} pageNum 从第几页
 * @param {number*} pageSize 每页返回数据条数
 * @param {string} sign 用于安全验证
 * @returns
 */
export function userOrders(userId, pageNum, pageSize, sign) {
  return requestWithoutToken("/api/vip/ordersInfoWithPages", "get", {
    userId,
    pageNum,
    pageSize,
    sign,
  });
}
