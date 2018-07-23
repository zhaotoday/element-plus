import consts from '@/utils/consts'

export default {
  /**
   * 获取图片地址
   */
  getImageURL (data) {
    return `${consts.BASE_URL}/files/${data.dir}/${data.uuid}.${data.ext}`
  }
}
