import Env from './env'

// UC API
const UC_API = Env.apis.uc

// 文章 API
const ARTICLE_API = Env.getAPI('articles')

export default {
  UC_API,
  ARTICLE_API
}
