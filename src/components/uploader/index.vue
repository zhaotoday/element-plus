<template>
  <div>
    <CChildUploader
      key="0"
      v-if="hasDefaultFile && !value"
      ref="uploader"
      :max-size="maxSize"
      :format="format"
      @change="handleUploaderChange" />
    <CChildUploader
      key="1"
      v-if="hasDefaultFile && value"
      ref="uploader"
      :value="value"
      :max-size="maxSize"
      :format="format"
      @change="handleUploaderChange" />
    <CChildUploader
      key="2"
      v-if="!hasDefaultFile"
      ref="uploader"
      :max-size="maxSize"
      :format="format"
      @change="handleUploaderChange" />
    <Input
      :value="value"
      style="display: none;" />
  </div>
</template>

<script>
  import CChildUploader from './components/Uploader'

  export default {
    name: 'CUploader',
    components: {
      CChildUploader
    },
    props: {
      hasDefaultFile: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number],
        default: 0
      },
      format: {
        type: Array,
        default () {
          return ['jpg', 'jpeg', 'png']
        }
      },
      maxSize: {
        type: Number,
        default: 2048
      }
    },
    methods: {
      handleUploaderChange (file) {
        this.$emit('change', file)
      },
      remove () {
        this.$refs.uploader.remove()
      }
    }
  }
</script>
