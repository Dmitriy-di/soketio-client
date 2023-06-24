const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthorizationLayout.vue'),
    children: [
      {
        path: 'Enter',
        component: () => import('components/EnterPage.vue'),
      },
      {
        path: '',
        component: () => import('components/RegisterPage.vue'),
      },
    ],
  },

  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/chat.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
