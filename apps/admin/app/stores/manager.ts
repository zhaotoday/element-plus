import { createManagerStoreSetup } from '@vuejs-repo/core'
import { publicRequest } from '~/utils/request'

export const useManagerStore = defineStore(
  'manager',
  () => {
    return createManagerStoreSetup({
      post: publicRequest.post.bind(publicRequest),
    })
  },
  {
    persist: true,
  },
)
