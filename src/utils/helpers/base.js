import consts from '@/utils/consts'

export default {
  /**
   * 获取图片地址
   */
  getImageURL ({ id }) {
    return `${consts.BASE_URL}/apis/v1/files/${id}`
  }
}
