export default {
  path: ':alias/surveys',
  component: resolve => require(['@/views/root'], resolve),
  children: [
    {
      path: 'subjects',
      component: resolve => require(['@/views/survey-subjects/list'], resolve)
    },
    {
      path: 'subjects/questions/:id',
      component: resolve => require(['@/views/survey-questions/list'], resolve)
    },
    {
      path: 'results',
      component: resolve => require(['@/views/survey-results/list'], resolve)
    }
  ]
}
