export default {
  path: '/',
  component: resolve => require(['@/views/home'], resolve),
  beforeEnter (to, from, next) {
    next('/surveys/surveys/subjects')
  }
}
