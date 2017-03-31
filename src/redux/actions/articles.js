import actionTypes from '../consts/articles'
import Model from '../models/articles'
import createAction from 'redux-actions/lib/createAction'

/**
 * 获取文章列表
 */
export const getArticles = createAction(
  actionTypes.GET_ARTICLES,
  (options) => {
    return new Model()
      .GET({
        params: options.params
      })
  }
)

/**
 * 给文章新增一个作者
 */
export const postArticleAuthor = createAction(
  actionTypes.POST_ARTICLE_AUTHOR,
  (options) => {
    return new Model()
      .addPath('{article_id}/authors')
      .replace({
        article_id: options.article_id
      })
      .POST({
        data: options.data
      })
  }
)
