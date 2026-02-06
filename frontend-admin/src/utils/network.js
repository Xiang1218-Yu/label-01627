/**
 * 网络工具模块
 * 提供 URL 构建等工具函数，解决手机端访问本地服务的问题
 */

/**
 * 构建手机端访问的完整 URL
 * @param {string} ip - 局域网 IP 地址
 * @param {number} port - 服务端口号
 * @param {string} text - 要展示的文字内容
 * @returns {string} 完整的访问 URL
 */
export function buildDisplayUrl(ip, port, text) {
  const encodedText = encodeURIComponent(text)
  return `http://${ip}:${port}/#/display?text=${encodedText}`
}

/**
 * 计算文本编码为 URL 后的字节长度
 * 用于判断二维码是否会因内容过长而难以扫描
 * @param {string} text - 原始文本
 * @returns {number} 编码后的字符长度
 */
export function getEncodedUrlLength(ip, port, text) {
  return buildDisplayUrl(ip, port, text).length
}

/**
 * QR 码推荐最大 URL 长度（字符数）
 * version 40 + L 级纠错最大可容纳约 4296 个字母数字，
 * 但为保证手机正常扫描识别，建议 URL 不超过 2000 字符
 */
export const QR_MAX_RECOMMENDED_LENGTH = 2000
