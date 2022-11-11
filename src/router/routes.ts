import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: () => import('@pages/NotFound'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@pages/Login'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@pages/Home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'users.list',
    component: () => import('@pages/UserList'),
  },
  {
    path: '/users/:id',
    name: 'users.detail',
    component: () => import('@pages/UserDetail'),
  },
  {
    path: '/user1',
    name: 'users1',
    component: () => import('@pages/ListExample.vue'),
  },
  {
    path: '/user2',
    name: 'users2',
    component: () => import('@pages/Home.vue'),
  },
  {
    path: '/user2/:id',
    name: 'users2.detail',
    component: () => import('@pages/Home.vue'),
  },
  {
    path: '/user3',
    name: 'users3',
    component: () => import('@pages/Home.vue'),
  },
  {
    path: '/notifications',
    name: 'notifications.list',
    component: () => import('@pages/NotificationList'),
  },
  {
    path: '/notifications/create',
    name: 'notifications.create',
    component: () => import('@pages/NotificationCreate'),
  },
  {
    path: '/notifications/:id',
    name: 'notifications.detail',
    component: () => import('@pages/NotificationDetail'),
  },
];

export default routes;
