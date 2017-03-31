import React from 'react'
import actionCreators from '../redux/actions'
import connect from 'react-redux/lib/connect/connect'
import init from 'utils/init'
import { Head, Body, Sidebar, Main } from 'app/layout'

init()

@connect(
  state => ({
    articles: state.articles
  }),
  dispatch => ({
    getArticles: (options) => dispatch(actionCreators.getArticles(options)),
    postArticleAuthor: (options) => dispatch(actionCreators.postArticleAuthor(options))
  })
)
class Comp extends React.Component {
  componentDidMount() {
    this.props.getArticles({
      params: {
        title: 'the title'
      }
    })

    this.props.postArticleAuthor({
      article_id: 123,
      data: {
        title: 'the title'
      }
    })
  }

  render() {
    return <div>
      <Head />
      <Body>
        <Sidebar ref="sidebar" />
        <Main>
          {this.props.children}
        </Main>
      </Body>
    </div>
  }
}

export default Comp
