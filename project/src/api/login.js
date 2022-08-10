import { requestWithoutToken } from "@/utils/request";

/**
 *  用户登录获取二维码
 * @param {string} senceId  先做保留
 * @param {string} isIframe
 * @returns
 */
export function userLogin(senceId, isIframe = 0) {
  return requestWithoutToken("/api/wechat/portal/getQrcode2", "get", {
    senceId,
    isIframe,
  });
}

/**
 *  轮训查看是否扫码
 * @param {string} ticket
 * @returns
 */
export function getScanQRcodes(ticket) {
  let formData = new FormData();
  formData.append("ticket", ticket);
  return requestWithoutToken("/api/wechat/portal/getUser", "POST", formData);
}

/**
 * 退出登录
 * @returns
 */
export function userLogOut() {
  return requestWithoutToken("/api/wechat/portal/logout", "get");
}
