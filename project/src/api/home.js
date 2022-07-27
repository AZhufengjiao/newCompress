import { requestWithoutToken } from "@/utils/request";

// 获取转码模板列表
/**
 *
 * @param {String} scene ( format-封装格式 compress-压缩 upload-上传)
 * @param {Int} ageNum 当前页
 * @param {Int} pageSize 页显示数量
 * @returns
 */

export function homeTemplateList(scene, pageNum, pageSize) {
  return requestWithoutToken("/api/transcoder/getTemplateList", "get", {
    scene,
    pageNum,
    pageSize,
  });
}

// 获取转码模板内容
/**
 *
 * @param {string} tmpId 模板id
 * @returns
 */
export function getCompressScenes(tmpId) {
  return requestWithoutToken("/api/transcoder/getTemplateInfo", "get", {
    tmpId,
  });
}

/**
 * 点击上传 获取token
 * @param {string} suffix 文件后缀
 * @returns
 */
export function getCompressToken(suffix) {
  return requestWithoutToken("/api/transcoder/uploadToken", "get", { suffix });
}

// 调用转码api
export function getTranscoding(
  url,
  watermark,
  format,
  avfast,
  avsmart,
  vcodec,
  target,
  bitRate,
  frameRate,
  highFrameRate,
  videoNo,
  audioNo,
  subtitleNo,
  resolution
) {
  let formData = new FormData();
  formData.append("url", url);
  formData.append("bitRate", bitRate);
  formData.append("frameRate", frameRate);
  formData.append("watermark", watermark);
  formData.append("format", format);
  formData.append("avfast", avfast);
  formData.append("avsmart", avsmart);
  formData.append("vcodec", vcodec);
  formData.append("target", target);
  formData.append("highFrameRate", highFrameRate);
  formData.append("videoNo", videoNo);
  formData.append("audioNo", audioNo);
  formData.append("subtitleNo", subtitleNo);
  formData.append("resolution", resolution);
  return requestWithoutToken("/api/transcoder/doTranscode", "post", formData);
}

// 获取异步处理进度;
export function getSchedule(pid) {
  return requestWithoutToken("/api/transcoder/operationStatus", "get", {
    persistentId: pid,
  });
}
