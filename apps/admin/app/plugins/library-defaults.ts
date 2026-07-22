import { configureUpload } from '@vuejs-repo/element-plus'
import { configureList } from '@vuejs-repo/core'
import { configureFileUrl } from '@vuejs-repo/core/utils/helpers'
import { adminFilesRequest } from '~/utils/request'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl

  configureUpload({
    filesApi: adminFilesRequest,
    baseUrl,
  })

  configureFileUrl({ baseUrl })

  configureList({
    message: { success: ElMessage.success },
  })
})
