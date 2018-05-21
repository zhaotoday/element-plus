/**
 * 重写插入图片插件
 * @param editHandler {Function} edit 事件
 */
export const overrideImagePlugin = editHandler => {
  window.KindEditor.plugin('image', function (K) {
    this.plugin.image = {
      edit: editHandler,
      delete: () => {
        let target = this.plugin.getSelectedImage()

        if (target.parent().name === 'a') {
          target = target.parent()
        }

        target.remove()

        // [IE] 删除图片后立即点击图片按钮出错
        this.addBookmark()
      }
    }

    this.clickToolbar('image', this.plugin.image.edit)
  })
}
