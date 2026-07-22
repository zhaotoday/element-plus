<script lang="ts" setup>
import { ResourceSelect } from '@vuejs-repo/element-plus'
import { adminRequest } from '~/utils/request'

defineProps<{
  module: string
}>()

const model = defineModel<string | number>()
</script>

<template>
  <ResourceSelect
    v-model="model"
    placeholder="请选择分类"
    :request="adminRequest"
    url="/categories"
    :query="{
      where: {
        module: {
          $eq: module,
        },
      },
      order: [['order', 'ASC']],
    }"
  />
</template>
