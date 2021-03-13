
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue'), name: 'login' }
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'inicio',
        name: 'app.home',
        component: () => import('pages/Home.vue'),
        meta: {
          authOnly: true
        }
      },
      {
        path: 'perfil',
        name: 'app.profile',
        component: () => import('pages/Profile.vue'),
        meta: {
          authOnly: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
