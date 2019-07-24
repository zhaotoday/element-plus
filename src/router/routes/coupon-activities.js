export default {
  path: ':alias/couponActivities',
  component: resolve => require(['@/views/coupon-activities'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/coupon-activities/list'], resolve)
    }
  ]
}
