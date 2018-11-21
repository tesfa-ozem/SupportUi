/* eslint-disable */
export default[
  {
    
      path: '/',
      meta: {
        public: true,
      },
      name: 'Login',
      component: () => import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/Views/Login.vue`
      )
  },
  {
    
    path: '/dashboard',
    meta: { breadcrumb: true },
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/Views/Dashboard.vue`
    )
},
{
    
  path: '/payments',
  meta: { breadcrumb: true },
  name: 'Payments',
  component: () => import(
    /* webpackChunkName: "routes" */
    /* webpackMode: "lazy-once" */
    `@/Views/Payments.vue`
  )
},
]