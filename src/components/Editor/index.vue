<template>
  <div>
    <textarea ref="content">{{ value }}</textarea>
    <Modal width="400" v-model="picture.modal" title="插入图片">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="图片" prop="picture">
          <Uploader key="0" v-if="id && !formValidate.picture" ref="uploader" @change="handleUploaderChange"></Uploader>
          <Uploader key="1" v-if="id && formValidate.picture" ref="uploader" v-model="formValidate.picture"
                    @change="handleUploaderChange"></Uploader>
          <Uploader key="2" v-if="!id" ref="uploader" @change="handleUploaderChange"></Uploader>
          <Input v-model="formValidate.picture" style="display: none;"></Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="picture.modal = false">取消</Button>
        <Button type="primary" size="large" @click="handleImageFormOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import 'kindeditor'
  import 'kindeditor/themes/default/default.css'
  import _consts from './utils/consts'
  import _helpers from './utils/helpers'
  import helpers from '@/utils/helpers/base'
  import Uploader from '@/components/Uploader'

  const KindEditor = window.KindEditor

  export default {
    name: 'editor',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    components: {
      Uploader
    },
    data () {
      return {
        formValidate: {
          picture: ''
        },
        ruleValidate: {},
        picture: {
          modal: false
        }
      }
    },
    mounted () {
      const vm = this

      const options = {
        width: '100%',
        height: 500,
        items: _consts.ITEMS,
        pluginsPath: 'KEPlugins/',
        afterChange: function () {
          vm.$emit('change', this.html())
        }
      }

      this.$nextTick(() => {
        this.editor = KindEditor.create(this.$refs.content, { ...options })
      })

      _helpers.overrideImagePlugin(() => {
        this.picture.modal = true
      })
    },
    methods: {
      html (html) {
        this.editor.html(html)
      },
      handleImageFormOk () {
        this.editor.insertHtml(`<img src="${helpers.getImageURL({ id: this.formValidate.picture })}" />`)
        this.$refs.uploader.remove()
        this.picture.modal = false
      },
      handleUploaderChange (file) {
        this.formValidate.picture = file ? file.id : ''
      }
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss">
</style>
