// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
// 使用 type-only import 导入 RouteRecordRaw
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/diablostring',
    name: 'Diablostring',
    component: () => import('@/views/Diablostring.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
